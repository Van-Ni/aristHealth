/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Appove1Component } from './appove1.component';

describe('Appove1Component', () => {
  let component: Appove1Component;
  let fixture: ComponentFixture<Appove1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Appove1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Appove1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
