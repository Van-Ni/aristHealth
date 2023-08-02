/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RangHamMatComponent } from './rang-ham-mat.component';

describe('RangHamMatComponent', () => {
  let component: RangHamMatComponent;
  let fixture: ComponentFixture<RangHamMatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RangHamMatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RangHamMatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
