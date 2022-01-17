import { Component, EventEmitter, Input, Output} from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { StorageService } from "../../../../shared/services/storage.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-question-open',
  templateUrl: './question-open.component.html',
  styleUrls: ['./question-open.component.scss']
})
export class QuestionOpenComponent {

  @Output() onChanged = new EventEmitter();
  @Input() itemData: any;

  optionsFormGroup: FormGroup;

  constructor(private storageService: StorageService,
              private activatedRoute: ActivatedRoute) {
    this.optionsFormGroup = new FormGroup({
      answer: new FormControl('', [Validators.required, Validators.maxLength(255)])
    })
  }

  submit(itemData: object) {
    let id = this.itemData.id;
    let date = new Date();
    let text = this.itemData.text;
    let type = this.itemData.type;
    let openAnswer = this.optionsFormGroup.controls['answer'].value;
    let options = [{}];

    this.storageService.setQuestion(id, text, type, date.getTime(), options, !this.itemData.answered, openAnswer);
    this.onChanged.emit(this.itemData.answered);
  }
}
