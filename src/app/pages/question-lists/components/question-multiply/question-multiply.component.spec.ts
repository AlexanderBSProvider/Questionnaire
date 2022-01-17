import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionMultiplyComponent } from './question-multiply.component';

describe('QuestionMultiplyComponent', () => {
  let component: QuestionMultiplyComponent;
  let fixture: ComponentFixture<QuestionMultiplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionMultiplyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionMultiplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
