/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { XetNghiemKhacChua18Component } from './xet-nghiem-khac-chua18.component';

describe('XetNghiemKhacChua18Component', () => {
  let component: XetNghiemKhacChua18Component;
  let fixture: ComponentFixture<XetNghiemKhacChua18Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XetNghiemKhacChua18Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XetNghiemKhacChua18Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
