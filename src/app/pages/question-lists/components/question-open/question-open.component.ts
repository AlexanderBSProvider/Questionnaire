import { Component, EventEmitter, Input, Output} from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { StorageService } from "../../../services/storage.service";

@Component({
  selector: 'app-question-open',
  templateUrl: './question-open.component.html',
  styleUrls: ['./question-open.component.scss']
})
export class QuestionOpenComponent {

  @Output() onChanged = new EventEmitter();
  @Input() itemData: any;

  optionsFormGroup: FormGroup;

  constructor(private storageService: StorageService) {
    this.optionsFormGroup = new FormGroup({
      answer: new FormControl('', [Validators.required, Validators.maxLength(255)])
    })
  }

  submit() {
    let questionData = {
      id: this.itemData.id,
      type: this.itemData.type,
      text: this.itemData.text,
      date: new Date(),
      options: [{}],
      answered: !this.itemData['answered'],
      openAnswer: this.optionsFormGroup.controls['answer'].value,
    }

    this.storageService.setQuestion(questionData);
    this.onChanged.emit(this.itemData.answered);
  }
}
