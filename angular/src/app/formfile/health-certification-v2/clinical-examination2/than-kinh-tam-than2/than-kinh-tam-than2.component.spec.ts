/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ThanKinhTamThan2Component } from './than-kinh-tam-than2.component';

describe('ThanKinhTamThan2Component', () => {
  let component: ThanKinhTamThan2Component;
  let fixture: ComponentFixture<ThanKinhTamThan2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThanKinhTamThan2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThanKinhTamThan2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
