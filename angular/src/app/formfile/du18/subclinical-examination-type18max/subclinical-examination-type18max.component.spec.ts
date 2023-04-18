/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SubclinicalExaminationType18maxComponent } from './subclinical-examination-type18max.component';

describe('SubclinicalExaminationType18maxComponent', () => {
  let component: SubclinicalExaminationType18maxComponent;
  let fixture: ComponentFixture<SubclinicalExaminationType18maxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubclinicalExaminationType18maxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubclinicalExaminationType18maxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
