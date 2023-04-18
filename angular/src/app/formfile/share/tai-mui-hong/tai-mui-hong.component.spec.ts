/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TaiMuiHongComponent } from './tai-mui-hong.component';

describe('TaiMuiHongComponent', () => {
  let component: TaiMuiHongComponent;
  let fixture: ComponentFixture<TaiMuiHongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaiMuiHongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaiMuiHongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
