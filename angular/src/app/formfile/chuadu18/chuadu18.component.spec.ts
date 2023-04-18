/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Chuadu18Component } from './chuadu18.component';

describe('Chuadu18Component', () => {
  let component: Chuadu18Component;
  let fixture: ComponentFixture<Chuadu18Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Chuadu18Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Chuadu18Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
