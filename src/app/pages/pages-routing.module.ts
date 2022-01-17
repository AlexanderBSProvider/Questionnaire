import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuestionManagementComponent } from "./question-management/question-management.component";
import { QuestionListsComponent } from "./question-lists/question-lists.component";
import { QuestionCombinedComponent } from "./question-combined/question-combined.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'management',
  },
  {
    path: 'management',
    component: QuestionManagementComponent,
  },
  {
    path: 'create',
    component: QuestionCombinedComponent,
    data: { isEdit: false }
  },
  {
    path: 'edit/:itemId',
    component: QuestionCombinedComponent,
    data: { isEdit: true }
  },
  {
    path: 'list',
    component: QuestionListsComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
