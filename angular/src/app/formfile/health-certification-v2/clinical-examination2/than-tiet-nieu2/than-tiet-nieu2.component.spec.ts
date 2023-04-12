/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ThanTietNieu2Component } from './than-tiet-nieu2.component';

describe('ThanTietNieu2Component', () => {
  let component: ThanTietNieu2Component;
  let fixture: ComponentFixture<ThanTietNieu2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThanTietNieu2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThanTietNieu2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
