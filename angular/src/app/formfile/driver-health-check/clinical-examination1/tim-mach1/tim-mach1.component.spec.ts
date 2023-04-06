/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TimMach1Component } from './tim-mach1.component';

describe('TimMach1Component', () => {
  let component: TimMach1Component;
  let fixture: ComponentFixture<TimMach1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimMach1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimMach1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
