/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { KetLuanGiayKhamComponent } from './ket-luan-giay-kham.component';

describe('KetLuanGiayKhamComponent', () => {
  let component: KetLuanGiayKhamComponent;
  let fixture: ComponentFixture<KetLuanGiayKhamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KetLuanGiayKhamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KetLuanGiayKhamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
