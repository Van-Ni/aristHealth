/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TuanHoanComponent } from './tuan-hoan.component';

describe('TuanHoanComponent', () => {
  let component: TuanHoanComponent;
  let fixture: ComponentFixture<TuanHoanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TuanHoanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TuanHoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
