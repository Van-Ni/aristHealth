/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { KhamLamSanKhacComponent } from './kham-lam-san-khac.component';

describe('KhamLamSanKhacComponent', () => {
  let component: KhamLamSanKhacComponent;
  let fixture: ComponentFixture<KhamLamSanKhacComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KhamLamSanKhacComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KhamLamSanKhacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
