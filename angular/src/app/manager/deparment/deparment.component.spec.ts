import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeparmentComponent } from './deparment.component';
describe('EnterpriseComponent', () => {
  let component: DeparmentComponent;
  let fixture: ComponentFixture<DeparmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeparmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeparmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
