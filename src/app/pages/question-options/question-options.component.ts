import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { StorageService } from "../services/storage.service";

@Component({
  selector: 'app-question-options',
  templateUrl: './question-options.component.html',
  styleUrls: ['./question-options.component.scss'],
})
export class QuestionOptionsComponent implements OnInit, OnChanges {

  @Input() questionType = '';
  @Input() optionForm: any;

  // pageType = this.activatedRoute.snapshot.url[0].path
  isEdit = this.activatedRoute.snapshot.data['isEdit'];
  urlParams = '';

  questionInfo: any;

  constructor(private storageService: StorageService, private activatedRoute: ActivatedRoute) {
    // this.optionForm = new FormGroup({
    //   'options': new FormArray([
    //   ]),
    // })
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.questionType === 'Open question') {
      while (this.optionForm.controls['options'].value.length) {
        (<FormArray>this.optionForm.controls['options']).removeAt(0);
      }
    } else if (this.questionType === 'Single choice' || this.questionType === 'Multiple choice') {
      if ((<FormArray>this.optionForm.controls['options']).value.length === 0) {
        (<FormArray>this.optionForm.controls['options']).controls = [];
        (<FormArray>this.optionForm.controls['options']).push(new FormControl('', Validators.required));
        (<FormArray>this.optionForm.controls['options']).push(new FormControl('', Validators.required));
      }
    }
  }

  ngOnInit(): void {
    this.setQuestionFormValue();
  }

  setQuestionFormValue(): void {
    if (this.isEdit) {
      (<FormArray>this.optionForm.controls['options']).controls = [];
      this.urlParams = this.activatedRoute.snapshot.params['itemId'];

      this.questionInfo = this.storageService.getQuestion(this.urlParams);

      for (let option of this.questionInfo.options) {
        (<FormArray>this.optionForm.controls['options']).push(new FormControl(option.value, Validators.required));
      }
    } else {
      (<FormArray>this.optionForm.controls['options']).push(new FormControl('', Validators.required));
      (<FormArray>this.optionForm.controls['options']).push(new FormControl('', Validators.required));
    }
  }

  onTouched: () => void = () => {};

  writeValue(v: any) {
    this.optionForm.setValue(v, { emitEvent: false });
  }

  registerOnChange(fn: (v: any) => void) {
    this.optionForm.valueChanges.subscribe((val: any) => {
      fn(val);
    });
  }

  getFormsControls(): FormArray {
    return this.optionForm.controls['options'] as FormArray;
  }

  addOption(): void {
    (<FormArray>this.optionForm.controls['options']).push(new FormControl('', Validators.required));
  }

  removeOption(index: number): void {
    if (this.optionForm.controls['options'].value.length > 2) {
      (<FormArray>this.optionForm.controls['options']).removeAt(index);
    }
  }
}
