/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SubclinicalExaminationType18minComponent } from './subclinical-examination-type18min.component';

describe('SubclinicalExaminationType18minComponent', () => {
  let component: SubclinicalExaminationType18minComponent;
  let fixture: ComponentFixture<SubclinicalExaminationType18minComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubclinicalExaminationType18minComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubclinicalExaminationType18minComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
