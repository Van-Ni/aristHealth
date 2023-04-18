/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { XetNghiemMauComponent } from './xet-nghiem-mau.component';

describe('XetNghiemMauComponent', () => {
  let component: XetNghiemMauComponent;
  let fixture: ComponentFixture<XetNghiemMauComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XetNghiemMauComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XetNghiemMauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
