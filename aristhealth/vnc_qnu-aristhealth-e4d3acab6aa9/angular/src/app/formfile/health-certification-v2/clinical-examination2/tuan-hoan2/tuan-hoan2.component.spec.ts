/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TuanHoan2Component } from './tuan-hoan2.component';

describe('TuanHoan2Component', () => {
  let component: TuanHoan2Component;
  let fixture: ComponentFixture<TuanHoan2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TuanHoan2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TuanHoan2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
