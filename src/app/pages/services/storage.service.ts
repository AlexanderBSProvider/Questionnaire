import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  setQuestion(questionData: any): void {
    if (questionData.type === 'Open question') {
      questionData.options.length = 0;
    }

    localStorage.setItem(questionData['id'], JSON.stringify(questionData));
  }

  getQuestion(id: string) {
    const questionInfoJSON = localStorage.getItem(id);

    if (questionInfoJSON) {
      return JSON.parse(questionInfoJSON);
    }
    return null;
  }
}
