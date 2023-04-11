/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CurrentConclusionType3Component } from './current-conclusion-type3.component';

describe('CurrentConclusionType3Component', () => {
  let component: CurrentConclusionType3Component;
  let fixture: ComponentFixture<CurrentConclusionType3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentConclusionType3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentConclusionType3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
