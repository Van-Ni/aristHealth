/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ThaiSan1Component } from './thai-san1.component';

describe('ThaiSan1Component', () => {
  let component: ThaiSan1Component;
  let fixture: ComponentFixture<ThaiSan1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThaiSan1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThaiSan1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
