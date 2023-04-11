/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TaiMuiHong1Component } from './tai-mui-hong1.component';

describe('TaiMuiHong1Component', () => {
  let component: TaiMuiHong1Component;
  let fixture: ComponentFixture<TaiMuiHong1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaiMuiHong1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaiMuiHong1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
