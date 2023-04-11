/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HealthCertificationV2Component } from './health-certification-v2.component';

describe('HealthCertificationV2Component', () => {
  let component: HealthCertificationV2Component;
  let fixture: ComponentFixture<HealthCertificationV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthCertificationV2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthCertificationV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
