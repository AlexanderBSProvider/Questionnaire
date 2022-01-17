import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators} from "@angular/forms";
import { ActivatedRoute } from "@angular/router";

import { StorageService } from "../../../../shared/services/storage.service";

@Component({
  selector: 'app-question-single',
  templateUrl: './question-single.component.html',
  styleUrls: ['./question-single.component.scss']
})
export class QuestionSingleComponent {

  @Input() itemData: any;
  @Output() onChanged = new EventEmitter();

  optionsFormGroup: FormGroup;

  constructor(private storageService: StorageService,
              private activatedRoute: ActivatedRoute) {
    this.optionsFormGroup = new FormGroup({
      answer: new FormControl('', Validators.required)
    })
  }

  submit(itemData: object) {
    let id = this.itemData.id;
    let date = new Date();
    let text = this.itemData.text;
    let type = this.itemData.type;

    let options;
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

    this.storageService.setQuestion(id, text, type, date.getTime(), options, !this.itemData.answered);
    this.onChanged.emit(this.itemData.answered);
  }
}
