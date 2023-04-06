/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ThanKinh1Component } from './than-kinh1.component';

describe('ThanKinh1Component', () => {
  let component: ThanKinh1Component;
  let fixture: ComponentFixture<ThanKinh1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThanKinh1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThanKinh1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
