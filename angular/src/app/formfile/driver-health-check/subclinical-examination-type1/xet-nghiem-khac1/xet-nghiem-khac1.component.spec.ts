/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { XetNghiemKhac1Component } from './xet-nghiem-khac1.component';

describe('XetNghiemKhac1Component', () => {
  let component: XetNghiemKhac1Component;
  let fixture: ComponentFixture<XetNghiemKhac1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XetNghiemKhac1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XetNghiemKhac1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
