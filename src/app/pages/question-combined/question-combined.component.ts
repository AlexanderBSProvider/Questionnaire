import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { v4 as uuidv4 } from 'uuid';
import { StorageService } from "../services/storage.service";


@Component({
  selector: 'app-question-combined',
  templateUrl: './question-combined.component.html',
  styleUrls: ['./question-combined.component.scss']
})
export class QuestionCombinedComponent implements OnInit {

  isEdit = this.activatedRoute.snapshot.data['isEdit'];

  urlParams = '';
  questionInfo: any;

  types = [
    {
      key: 0,
      value: 'Single choice'
    },
    {
      key: 1,
      value: 'Multiple choice'
    },
    {
      key: 2,
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
    })
  }

  ngOnInit(): void {
    this.setQuestionFormValue();
  }

  setQuestionFormValue(): void {
    if (!this.isEdit) {
      return
    }

    this.urlParams = this.activatedRoute.snapshot.params['itemId'];

    this.questionInfo = this.storageService.getQuestion(this.urlParams)

    this.questionForm.controls['text'].setValue(this.questionInfo.text);
    this.questionForm.controls['type'].setValue(this.questionInfo.type);
  }

  submit(): void {
    let optionsWithAnswers = [];

    for (let option of this.questionForm.value.options) {
      optionsWithAnswers.push({answered: false, value: option})
    }

    let questionData = {
      id: this.isEdit ? this.urlParams : uuidv4(),
      type: this.questionForm.value.type,
      text: this.questionForm.value.text,
      date: new Date(),
      options: optionsWithAnswers,
      answered: false,
      openAnswer: '',
    }

    this.storageService.setQuestion(questionData);
  }
}
