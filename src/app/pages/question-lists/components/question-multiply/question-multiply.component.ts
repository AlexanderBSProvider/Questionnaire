import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {StorageService} from "../../../../shared/services/storage.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-question-multiply',
  templateUrl: './question-multiply.component.html',
  styleUrls: ['./question-multiply.component.scss']
})
export class QuestionMultiplyComponent implements OnInit, OnChanges {

  @Output() onChanged = new EventEmitter();
  @Input() itemData: any;

  optionsFormGroup: FormGroup;

  constructor(private storageService: StorageService,
              private activatedRoute: ActivatedRoute) {
    this.optionsFormGroup = new FormGroup({
      answers: new FormArray([
        // new FormControl('')
      ])
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('123')
  }

  ngOnInit(): void {
    console.log( this.itemData,'itemData')
  }

  submit(itemData: object) {
    console.log(this.optionsFormGroup.value, 'valueForm')
    let id = this.itemData.id;
    let date = new Date();
    let text = this.itemData.text;
    let type = this.itemData.type;

    console.log(this.optionsFormGroup.controls['answers'].value, ' hyi')
    let options;
    const selectedOptions = this.optionsFormGroup.controls['answers'].value.map((item: { answered: boolean, value: string }) => item.value);

    if (this.itemData.answered) {
      console.log('answered')
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
    // let options = this.optionsFormGroup.controls['answers'].value;
    // console.log(options,'options1')


    // for (let option of options.options) {
    //   optionsWithAnswers.push({answered: false, value: option})
    // }
    //
    this.storageService.setQuestion(id, text, type, date.getTime(), options, !this.itemData['answered']);
    this.onChanged.emit(this.itemData.answered);
  }

  updateChkbxArray(option: any, isChecked: boolean, key: string) {
    const chkArray = <FormArray>this.optionsFormGroup.get(key);
    if (isChecked) {
      //sometimes inserts values already included creating double records for the same values -hence the defence
      if (chkArray.controls.findIndex(x => x.value == option.id) == -1)
        chkArray.push(new FormControl({ answered: true, value: option.value }, Validators.required));
    } else {
      let idx = chkArray.controls.findIndex(x => x.value == option.id);
      chkArray.removeAt(idx);
    }
  }
}
