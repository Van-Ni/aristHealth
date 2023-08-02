/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TieuHoa2Component } from './tieu-hoa2.component';

describe('TieuHoa2Component', () => {
  let component: TieuHoa2Component;
  let fixture: ComponentFixture<TieuHoa2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TieuHoa2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TieuHoa2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
