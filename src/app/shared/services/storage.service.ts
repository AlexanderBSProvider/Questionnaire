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
    date: new Date(),
    options: [{}],
    answered: false,
    openAnswer: ''
  }

  constructor(private router: Router) { }

  setQuestion(id: string, text: string, type: string,  date: number,  options?: any, answered: boolean = false, openAnswer?: any) {

    this.question.options.pop();

    this.question.text = text;
    this.question.date = new Date(date);
    this.question.type = type;
    this.question.options = options;
    this.question.id = id;
    this.question.answered = answered;
    this.question.openAnswer = openAnswer;

    if (type === 'Open question') {
      this.question.options.length = 0;
    }

    localStorage.setItem(id, JSON.stringify(this.question));
  }
}
