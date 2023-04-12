/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CoXuongKhop3Component } from './co-xuong-khop3.component';

describe('CoXuongKhop3Component', () => {
  let component: CoXuongKhop3Component;
  let fixture: ComponentFixture<CoXuongKhop3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoXuongKhop3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoXuongKhop3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
