/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Mat1Component } from './mat1.component';

describe('Mat1Component', () => {
  let component: Mat1Component;
  let fixture: ComponentFixture<Mat1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Mat1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Mat1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
