/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TaiMuiHong3Component } from './tai-mui-hong3.component';

describe('TaiMuiHong3Component', () => {
  let component: TaiMuiHong3Component;
  let fixture: ComponentFixture<TaiMuiHong3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaiMuiHong3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaiMuiHong3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
