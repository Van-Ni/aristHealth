/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NgoaiKhoaComponent } from './ngoai-khoa.component';

describe('NgoaiKhoaComponent', () => {
  let component: NgoaiKhoaComponent;
  let fixture: ComponentFixture<NgoaiKhoaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgoaiKhoaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgoaiKhoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
