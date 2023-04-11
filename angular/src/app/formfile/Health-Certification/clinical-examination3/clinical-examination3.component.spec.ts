/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ClinicalExamination3Component } from './clinical-examination3.component';

describe('ClinicalExamination3Component', () => {
  let component: ClinicalExamination3Component;
  let fixture: ComponentFixture<ClinicalExamination3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClinicalExamination3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicalExamination3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
