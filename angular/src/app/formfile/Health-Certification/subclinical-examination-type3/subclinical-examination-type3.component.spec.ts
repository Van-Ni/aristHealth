/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SubclinicalExaminationType3Component } from './subclinical-examination-type3.component';

describe('SubclinicalExaminationType3Component', () => {
  let component: SubclinicalExaminationType3Component;
  let fixture: ComponentFixture<SubclinicalExaminationType3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubclinicalExaminationType3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubclinicalExaminationType3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
