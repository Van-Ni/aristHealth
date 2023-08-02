/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Mat3Component } from './mat3.component';

describe('Mat3Component', () => {
  let component: Mat3Component;
  let fixture: ComponentFixture<Mat3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Mat3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Mat3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
