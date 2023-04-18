/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Du18Component } from './du18.component';

describe('Du18Component', () => {
  let component: Du18Component;
  let fixture: ComponentFixture<Du18Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Du18Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Du18Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
