/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { XetNghiemNuocTieu3Component } from './xet-nghiem-nuoc-tieu3.component';

describe('XetNghiemNuocTieu3Component', () => {
  let component: XetNghiemNuocTieu3Component;
  let fixture: ComponentFixture<XetNghiemNuocTieu3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XetNghiemNuocTieu3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XetNghiemNuocTieu3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
