/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RangHamMat2Component } from './rang-ham-mat2.component';

describe('RangHamMat2Component', () => {
  let component: RangHamMat2Component;
  let fixture: ComponentFixture<RangHamMat2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RangHamMat2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RangHamMat2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
