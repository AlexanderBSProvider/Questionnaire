import { Component } from '@angular/core';

@Component({
  selector: 'app-question-management',
  templateUrl: './question-management.component.html',
  styleUrls: ['./question-management.component.scss']
})
export class QuestionManagementComponent {

  _localStorage = Object.entries(localStorage)
    .map((val) => {
      return JSON.parse(val[1]);
    })
    .sort((obj1: any, obj2: any) => {
      return new Date(obj2.date).getTime() - new Date(obj1.date).getTime();
    });

  deleteQuestion(item: any, index: number) {
    this._localStorage.splice(index, 1);
    localStorage.removeItem(item['id']);
  }

  clearLocal() {
    localStorage.clear()
  }
}
