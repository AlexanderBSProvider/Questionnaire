import { Component } from '@angular/core';

@Component({
  selector: 'app-question-management',
  templateUrl: './question-management.component.html',
  styleUrls: ['./question-management.component.scss']
})
export class QuestionManagementComponent {

  _localStorage = Object.entries(localStorage)
    .sort((obj1: any, obj2: any) => {
      return -JSON.parse(obj1[1]).date + JSON.parse(obj2[1]).date
    }).map((val) => {
      return JSON.parse(val[1])
    });


  deleteQuestion(item: any, index: number) {
    this._localStorage.splice(index, 1);
    localStorage.removeItem(item['id']);
  }

  numberToDate(number: number) {
    return new Date(number);
  }

  clearLocal() {
    localStorage.clear()
  }
}
