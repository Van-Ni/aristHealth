/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Mat2Component } from './mat2.component';

describe('Mat2Component', () => {
  let component: Mat2Component;
  let fixture: ComponentFixture<Mat2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Mat2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Mat2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
