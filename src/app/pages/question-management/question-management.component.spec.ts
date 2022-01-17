import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionManagementComponent } from './question-management.component';

describe('QuestionManagementComponent', () => {
  let component: QuestionManagementComponent;
  let fixture: ComponentFixture<QuestionManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
