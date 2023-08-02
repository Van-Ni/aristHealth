/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { XetNghiemMau3Component } from './xet-nghiem-mau3.component';

describe('XetNghiemMau3Component', () => {
  let component: XetNghiemMau3Component;
  let fixture: ComponentFixture<XetNghiemMau3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XetNghiemMau3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XetNghiemMau3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
