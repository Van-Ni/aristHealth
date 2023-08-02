/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { XetNghiemMaTuyVaMauComponent } from './xet-nghiem-ma-tuy-va-mau.component';

describe('XetNghiemMaTuyVaMauComponent', () => {
  let component: XetNghiemMaTuyVaMauComponent;
  let fixture: ComponentFixture<XetNghiemMaTuyVaMauComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XetNghiemMaTuyVaMauComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XetNghiemMaTuyVaMauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
