import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { DepartmentDto, DepartmentServiceServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-edit-department',
  templateUrl: './edit-department.component.html',
  styleUrls: ['./edit-department.component.css']
})
export class EditDepartmentComponent  extends AppComponentBase implements OnInit {
  id: string;
  saving = false;
  department = new DepartmentDto();
  @Output() onSave = new EventEmitter<any>();
  constructor(
    injector: Injector,
    private _departmentService: DepartmentServiceServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector)
  }
  ngOnInit() {
    this._departmentService
      .get(this.id)
      .subscribe((result: DepartmentDto) => {
        this.department = result;
        console.log(this.department)
      });
  }
  save(): void {
    this.saving = true;

    const department = new DepartmentDto();
    department.init(this.department);
    console.log(department)
    this._departmentService
      .update(department)
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
