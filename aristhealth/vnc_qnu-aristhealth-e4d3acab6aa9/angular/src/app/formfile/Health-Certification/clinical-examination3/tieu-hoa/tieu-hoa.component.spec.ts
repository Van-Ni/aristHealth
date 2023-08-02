/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TieuHoaComponent } from './tieu-hoa.component';

describe('TieuHoaComponent', () => {
  let component: TieuHoaComponent;
  let fixture: ComponentFixture<TieuHoaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TieuHoaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TieuHoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
