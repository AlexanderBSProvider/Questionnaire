import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from "./pages-routing.module";
import { QuestionManagementComponent } from "./question-management/question-management.component";
import { MaterialModule } from "../shared/material/material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { QuestionCombinedComponent } from './question-combined/question-combined.component';
import { QuestionOptionsComponent } from './question-options/question-options.component';
import { QuestionListsComponent } from "./question-lists/question-lists.component";
import { QuestionSingleComponent } from './question-lists/components/question-single/question-single.component';
import { QuestionMultiplyComponent } from './question-lists/components/question-multiply/question-multiply.component';
import { QuestionOpenComponent } from './question-lists/components/question-open/question-open.component';

@NgModule({
  declarations: [
    QuestionManagementComponent,
    QuestionOptionsComponent,
    QuestionCombinedComponent,
    QuestionListsComponent,
    QuestionSingleComponent,
    QuestionMultiplyComponent,
    QuestionOpenComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class PagesModule { }
