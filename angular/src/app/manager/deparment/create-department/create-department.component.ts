import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { DeparmentComponent } from '../deparment.component';
import { DepartmentDto, DepartmentServiceServiceProxy } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-create-department',
  templateUrl: './create-department.component.html',
  styleUrls: ['./create-department.component.css']
})
export class CreateDepartmentComponent extends AppComponentBase implements OnInit {
  saving = false;
  department = new DepartmentDto();
  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _departmentService: DepartmentServiceServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit() {
  }
  save(): void {
    this.saving = true;

    const department = new DepartmentDto();
    department.init(this.department);
    console.log(department)
    this._departmentService
      .create(department)
      .subscribe(
        () => {
          this.notify.info(this.l('SavedSuccessfully'));
          this.bsModalRef.hide();
          this.onSave.emit();
        },
        () => {
          this.saving = false;
        }
      );
  }
}
