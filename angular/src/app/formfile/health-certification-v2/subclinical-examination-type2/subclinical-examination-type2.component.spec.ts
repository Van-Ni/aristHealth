/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SubclinicalExaminationType2Component } from './subclinical-examination-type2.component';

describe('SubclinicalExaminationType2Component', () => {
  let component: SubclinicalExaminationType2Component;
  let fixture: ComponentFixture<SubclinicalExaminationType2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubclinicalExaminationType2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubclinicalExaminationType2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
