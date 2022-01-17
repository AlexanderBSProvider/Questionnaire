import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {StorageService} from "../../../services/storage.service";
import {ActivatedRoute} from "@angular/router";
import {v4 as uuidv4} from "uuid";

@Component({
  selector: 'app-question-multiply',
  templateUrl: './question-multiply.component.html',
  styleUrls: ['./question-multiply.component.scss']
})
export class QuestionMultiplyComponent {

  @Output() onChanged = new EventEmitter();
  @Input() itemData: any;

  optionsFormGroup: FormGroup;

  constructor(private storageService: StorageService,
              private activatedRoute: ActivatedRoute) {
    this.optionsFormGroup = new FormGroup({
      answers: new FormArray([
      ])
    })
  }

  submit(itemData: object): void {

    let options;
    const selectedOptions = this.optionsFormGroup.controls['answers'].value.map((item: { answered: boolean, value: string }) => item.value);

    if (this.itemData.answered) {
      options = this.itemData.options.map((item: any) =>  ({
        ...item,
        answered: false
      }));
    } else {
      options = this.itemData.options.map((item: any) => ({
        ...item,
        answered: selectedOptions.includes(item.value)
      }))
    }

    let questionData = {
      id: this.itemData.id,
      type: this.itemData.type,
      text: this.itemData.text,
      date: new Date(),
      options: options,
      answered: !this.itemData['answered'],
      openAnswer: '',
    }

    this.storageService.setQuestion(questionData);
    this.onChanged.emit(this.itemData.answered);
  }

  updateChkbxArray(option: any, isChecked: boolean, key: string) {
    const chkArray = <FormArray>this.optionsFormGroup.get(key);
    if (isChecked) {
      if (chkArray.controls.findIndex(x => x.value == option.id) == -1)
        chkArray.push(new FormControl({ answered: true, value: option.value }, Validators.required));
    } else {
      let idx = chkArray.controls.findIndex(x => x.value == option.id);
      chkArray.removeAt(idx);
    }
  }
}
