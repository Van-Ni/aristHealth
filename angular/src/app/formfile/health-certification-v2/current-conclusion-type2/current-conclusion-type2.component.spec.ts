/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CurrentConclusionType2Component } from './current-conclusion-type2.component';

describe('CurrentConclusionType2Component', () => {
  let component: CurrentConclusionType2Component;
  let fixture: ComponentFixture<CurrentConclusionType2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentConclusionType2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentConclusionType2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
