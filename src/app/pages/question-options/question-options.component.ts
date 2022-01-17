import { Component, forwardRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ControlValueAccessor, FormArray, FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators } from "@angular/forms";

import { StorageService } from "../../shared/services/storage.service";

@Component({
  selector: 'app-question-options',
  templateUrl: './question-options.component.html',
  styleUrls: ['./question-options.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => QuestionOptionsComponent)
    }
  ]
})
export class QuestionOptionsComponent implements OnInit, OnChanges, ControlValueAccessor {

  @Input() questionType = '';

  pageType = this.activatedRoute.snapshot.url[0].path;

  urlParams = '';

  questionInfo: any;

  @Input() optionForm: FormGroup;

  constructor(private storageService: StorageService,
              private activatedRoute: ActivatedRoute) {
    this.optionForm = new FormGroup({
      'options': new FormArray([
      ]),
    })
  }

  ngOnChanges(changes: SimpleChanges) {

    if (this.questionType === 'Open question') {
      while (this.optionForm.controls['options'].value.length) {
        (<FormArray>this.optionForm.controls['options']).removeAt(0)
      }

    } else if (this.questionType === 'Single choice') {

      if ((<FormArray>this.optionForm.controls['options']).value.length === 0) {
        (<FormArray>this.optionForm.controls['options']).controls = [];
        (<FormArray>this.optionForm.controls['options']).push(new FormControl('', Validators.required));
        (<FormArray>this.optionForm.controls['options']).push(new FormControl('', Validators.required));
      }

    } else if (this.questionType === 'Multiple choice') {

      if ((<FormArray>this.optionForm.controls['options']).value.length === 0) {
        (<FormArray>this.optionForm.controls['options']).controls = [];
        (<FormArray>this.optionForm.controls['options']).push(new FormControl('', Validators.required));
        (<FormArray>this.optionForm.controls['options']).push(new FormControl('', Validators.required));
      }
    }
  }

  ngOnInit(): void {

    if (this.pageType === 'edit') {
      (<FormArray>this.optionForm.controls['options']).controls = [];
      this.urlParams = this.activatedRoute.snapshot.params['itemId'];
      let questionInfoJSON = localStorage.getItem(this.urlParams);

      if (questionInfoJSON) {
        this.questionInfo = JSON.parse(questionInfoJSON);
      }

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
    this.optionForm.valueChanges.subscribe(val => {
      fn(val);
    });
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
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
