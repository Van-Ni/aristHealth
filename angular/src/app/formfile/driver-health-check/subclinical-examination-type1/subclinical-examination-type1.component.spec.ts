/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SubclinicalExaminationType1Component } from './subclinical-examination-type1.component';

describe('SubclinicalExaminationType1Component', () => {
  let component: SubclinicalExaminationType1Component;
  let fixture: ComponentFixture<SubclinicalExaminationType1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubclinicalExaminationType1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubclinicalExaminationType1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
