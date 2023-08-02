/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HoHap1Component } from './ho-hap1.component';

describe('HoHap1Component', () => {
  let component: HoHap1Component;
  let fixture: ComponentFixture<HoHap1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoHap1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoHap1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
