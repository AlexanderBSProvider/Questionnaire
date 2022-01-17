import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionListsComponent } from './question-lists.component';

describe('QuestionListsComponent', () => {
  let component: QuestionListsComponent;
  let fixture: ComponentFixture<QuestionListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionListsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
