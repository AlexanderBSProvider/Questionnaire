import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionSingleComponent } from './question-single.component';

describe('QuestionSingleComponent', () => {
  let component: QuestionSingleComponent;
  let fixture: ComponentFixture<QuestionSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionSingleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
