/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Mat18Component } from './mat18.component';

describe('Mat18Component', () => {
  let component: Mat18Component;
  let fixture: ComponentFixture<Mat18Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Mat18Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Mat18Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
