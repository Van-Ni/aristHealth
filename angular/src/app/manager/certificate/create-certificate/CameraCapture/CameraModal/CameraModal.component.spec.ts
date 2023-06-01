/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CameraModalComponent } from './CameraModal.component';

describe('CameraModalComponent', () => {
  let component: CameraModalComponent;
  let fixture: ComponentFixture<CameraModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CameraModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CameraModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
