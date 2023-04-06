/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CoXuongKhop1Component } from './co-xuong-khop1.component';

describe('CoXuongKhop1Component', () => {
  let component: CoXuongKhop1Component;
  let fixture: ComponentFixture<CoXuongKhop1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoXuongKhop1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoXuongKhop1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
