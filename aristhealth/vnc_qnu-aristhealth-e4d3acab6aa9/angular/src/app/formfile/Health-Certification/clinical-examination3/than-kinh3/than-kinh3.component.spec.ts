/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ThanKinh3Component } from './than-kinh3.component';

describe('ThanKinh3Component', () => {
  let component: ThanKinh3Component;
  let fixture: ComponentFixture<ThanKinh3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThanKinh3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThanKinh3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
