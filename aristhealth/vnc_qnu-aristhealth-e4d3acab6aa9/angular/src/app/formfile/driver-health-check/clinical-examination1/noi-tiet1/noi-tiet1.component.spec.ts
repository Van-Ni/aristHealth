/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NoiTiet1Component } from './noi-tiet1.component';

describe('NoiTiet1Component', () => {
  let component: NoiTiet1Component;
  let fixture: ComponentFixture<NoiTiet1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoiTiet1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoiTiet1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
