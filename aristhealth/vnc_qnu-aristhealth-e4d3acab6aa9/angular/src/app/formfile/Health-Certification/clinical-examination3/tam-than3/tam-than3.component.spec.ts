/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TamThan3Component } from './tam-than3.component';

describe('TamThan3Component', () => {
  let component: TamThan3Component;
  let fixture: ComponentFixture<TamThan3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TamThan3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TamThan3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
