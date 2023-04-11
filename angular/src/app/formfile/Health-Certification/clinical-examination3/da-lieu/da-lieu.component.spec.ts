/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DaLieuComponent } from './da-lieu.component';

describe('DaLieuComponent', () => {
  let component: DaLieuComponent;
  let fixture: ComponentFixture<DaLieuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DaLieuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DaLieuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
