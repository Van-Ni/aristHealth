/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TaiMuiHongLaixeComponent } from './tai-mui-hong-laixe.component';

describe('TaiMuiHongLaixeComponent', () => {
  let component: TaiMuiHongLaixeComponent;
  let fixture: ComponentFixture<TaiMuiHongLaixeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaiMuiHongLaixeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaiMuiHongLaixeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
