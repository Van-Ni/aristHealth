/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ThanTietNieuComponent } from './than-tiet-nieu.component';

describe('ThanTietNieuComponent', () => {
  let component: ThanTietNieuComponent;
  let fixture: ComponentFixture<ThanTietNieuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThanTietNieuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThanTietNieuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
