/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HoHap3Component } from './ho-hap3.component';

describe('HoHap3Component', () => {
  let component: HoHap3Component;
  let fixture: ComponentFixture<HoHap3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoHap3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoHap3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
