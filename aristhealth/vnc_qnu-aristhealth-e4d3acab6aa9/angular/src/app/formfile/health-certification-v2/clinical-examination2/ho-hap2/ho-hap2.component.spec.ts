/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HoHap2Component } from './ho-hap2.component';

describe('HoHap2Component', () => {
  let component: HoHap2Component;
  let fixture: ComponentFixture<HoHap2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoHap2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoHap2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
