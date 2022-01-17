import { Injectable } from '@angular/core';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  question = {
    id: '',
    text: '',
    type: '',
    date: 0,
    options: [{}],
    answered: false,
    openAnswer: ''
  }

  constructor(private router: Router) { }

  setQuestion(id: string, text: string, type: string,  date: number,  options?: any, answered: boolean = false, openAnswer?: any) {
    this.question.options.pop();
    this.question.text = text;
    this.question.date = date;
    this.question.type = type;
    this.question.options = options;

    // for (let option of options) {
    //   this.question.options.push({answered: false, value: option})
    // }
    this.question.id = id;
    this.question.answered = answered;
    this.question.openAnswer = openAnswer;

    if (type === 'Open question') {
      this.question.options.length = 0;
    }

    localStorage.setItem(id, JSON.stringify(this.question));
  }

  getStorageValue(item:any) {
    // console.log(JSON.parse(item[1]), '11');
    return JSON.parse(item[1]);
  }
}
