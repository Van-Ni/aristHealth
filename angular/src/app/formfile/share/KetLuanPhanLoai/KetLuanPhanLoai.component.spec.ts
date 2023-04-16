/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { KetLuanPhanLoaiComponent } from './KetLuanPhanLoai.component';

describe('KetLuanPhanLoaiComponent', () => {
  let component: KetLuanPhanLoaiComponent;
  let fixture: ComponentFixture<KetLuanPhanLoaiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KetLuanPhanLoaiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KetLuanPhanLoaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
