/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TamThan1Component } from './tam-than1.component';

describe('TamThan1Component', () => {
  let component: TamThan1Component;
  let fixture: ComponentFixture<TamThan1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TamThan1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TamThan1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
