/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ChuanDoanHinhAnh3Component } from './chuan-doan-hinh-anh3.component';

describe('ChuanDoanHinhAnh3Component', () => {
  let component: ChuanDoanHinhAnh3Component;
  let fixture: ComponentFixture<ChuanDoanHinhAnh3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChuanDoanHinhAnh3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChuanDoanHinhAnh3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
