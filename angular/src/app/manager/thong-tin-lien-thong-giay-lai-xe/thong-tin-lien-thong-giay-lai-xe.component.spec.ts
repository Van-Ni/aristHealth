/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ThongTinLienThongGiayLaiXeComponent } from './thong-tin-lien-thong-giay-lai-xe.component';

describe('ThongTinLienThongGiayLaiXeComponent', () => {
  let component: ThongTinLienThongGiayLaiXeComponent;
  let fixture: ComponentFixture<ThongTinLienThongGiayLaiXeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThongTinLienThongGiayLaiXeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThongTinLienThongGiayLaiXeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
