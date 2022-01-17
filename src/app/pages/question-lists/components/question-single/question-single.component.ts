import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators} from "@angular/forms";
import { StorageService } from "../../../services/storage.service";

@Component({
  selector: 'app-question-single',
  templateUrl: './question-single.component.html',
  styleUrls: ['./question-single.component.scss']
})
export class QuestionSingleComponent {

  @Input() itemData: any;
  @Output() onChanged = new EventEmitter();

  optionsFormGroup: FormGroup;

  constructor(private storageService: StorageService) {
    this.optionsFormGroup = new FormGroup({
      answer: new FormControl('', Validators.required)
    })
  }

  submit(): void {
    let options: Array<object>;
    if (this.itemData.answered) {
      options = this.itemData.options.map((item: any) =>  ({
        ...item,
        answered: false
      }));
    } else {
      options = this.itemData.options.map((item: any) => ({
        ...item,
        answered: item.value === this.optionsFormGroup.controls['answer'].value
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
}
