/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CurrentConclusionType1Component } from './current-conclusion-type1.component';

describe('CurrentConclusionType1Component', () => {
  let component: CurrentConclusionType1Component;
  let fixture: ComponentFixture<CurrentConclusionType1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentConclusionType1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentConclusionType1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
