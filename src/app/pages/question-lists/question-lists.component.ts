import { Component } from '@angular/core';

@Component({
  selector: 'app-question-lists',
  templateUrl: './question-lists.component.html',
  styleUrls: ['./question-lists.component.scss']
})
export class QuestionListsComponent{

  _localStorage = this.getStorageData();

  _localStorageLeft = this._localStorage.filter(item => item.answered === false);
  _localStorageRight = this._localStorage.filter(item => item.answered === true);

  onChanged(answered: any) {

      this._localStorageLeft = this.getStorageData().filter(item => item.answered === false);
      this._localStorageRight = this.getStorageData().filter(item => item.answered === true);
  }

  getStorageData() {

    return Object.entries(localStorage)
      .sort((obj1: any, obj2: any) => {
        return -JSON.parse(obj1[1]).date + JSON.parse(obj2[1]).date
      }).map((val) => {
        return JSON.parse(val[1])
      });
  }
}
