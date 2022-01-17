import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {v4 as uuidv4} from 'uuid';
import {StorageService} from "../../shared/services/storage.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-question-combined',
  templateUrl: './question-combined.component.html',
  styleUrls: ['./question-combined.component.scss']
})
export class QuestionCombinedComponent implements OnInit {

  type = this.activatedRoute.snapshot.url[0].path;

  urlParams = '';
  questionInfo: any;

  types = [
    {
      key: uuidv4(),
      value: 'Single choice'
    },
    {
      key: uuidv4(),
      value: 'Multiple choice'
    },
    {
      key: uuidv4(),
      value: 'Open question'
    },
  ];

  questionForm: FormGroup;

  constructor(private storageService: StorageService,
              private activatedRoute: ActivatedRoute) {
    this.questionForm = new FormGroup({
      'type': new FormControl('', Validators.required),
      'text': new FormControl('', [
        Validators.required,
      ]),
      'options': new FormArray([
      ]),
      // 'test': new FormControl('22')
    })
  }

  ngOnInit(): void {
     if (this.type === 'edit') {
       this.urlParams = this.activatedRoute.snapshot.params['itemId'];
       let questionInfoJSON = localStorage.getItem(this.urlParams);

         if (questionInfoJSON) {
           this.questionInfo = JSON.parse(questionInfoJSON);
         }
         this.questionForm.controls['text'].setValue(this.questionInfo.text);
         this.questionForm.controls['type'].setValue(this.questionInfo.type);
     }
  }

  submit() {

    let id = this.type === 'edit' ? this.urlParams : uuidv4();
    let date = new Date();
    let questionData = this.questionForm.value;

    let optionsWithAnswers = [];

    for (let option of questionData.options) {
      optionsWithAnswers.push({answered: false, value: option})
    }

    this.storageService.setQuestion(id, questionData.text, questionData.type, date.getTime(), optionsWithAnswers);
  }
}
