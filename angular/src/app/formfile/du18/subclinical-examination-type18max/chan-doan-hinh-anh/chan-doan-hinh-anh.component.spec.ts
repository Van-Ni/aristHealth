/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ChanDoanHinhAnhComponent } from './chan-doan-hinh-anh.component';

describe('ChanDoanHinhAnhComponent', () => {
  let component: ChanDoanHinhAnhComponent;
  let fixture: ComponentFixture<ChanDoanHinhAnhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChanDoanHinhAnhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChanDoanHinhAnhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
