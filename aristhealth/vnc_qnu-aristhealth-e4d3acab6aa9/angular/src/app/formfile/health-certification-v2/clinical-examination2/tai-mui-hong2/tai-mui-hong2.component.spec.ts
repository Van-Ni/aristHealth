/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TaiMuiHong2Component } from './tai-mui-hong2.component';

describe('TaiMuiHong2Component', () => {
  let component: TaiMuiHong2Component;
  let fixture: ComponentFixture<TaiMuiHong2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaiMuiHong2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaiMuiHong2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
