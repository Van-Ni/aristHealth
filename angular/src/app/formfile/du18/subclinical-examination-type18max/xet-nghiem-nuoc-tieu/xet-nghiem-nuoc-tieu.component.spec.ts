/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { XetNghiemNuocTieuComponent } from './xet-nghiem-nuoc-tieu.component';

describe('XetNghiemNuocTieuComponent', () => {
  let component: XetNghiemNuocTieuComponent;
  let fixture: ComponentFixture<XetNghiemNuocTieuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XetNghiemNuocTieuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XetNghiemNuocTieuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
