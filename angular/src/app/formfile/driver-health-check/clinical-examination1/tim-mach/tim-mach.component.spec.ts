/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TimMachComponent } from './tim-mach.component';

describe('TimMachComponent', () => {
  let component: TimMachComponent;
  let fixture: ComponentFixture<TimMachComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimMachComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimMachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
