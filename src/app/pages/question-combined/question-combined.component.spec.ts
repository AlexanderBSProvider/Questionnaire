import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionCombinedComponent } from './question-combined.component';

describe('QuestionCombinedComponent', () => {
  let component: QuestionCombinedComponent;
  let fixture: ComponentFixture<QuestionCombinedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionCombinedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionCombinedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
