import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { DepartmentDto, DepartmentServiceServiceProxy, GroupDto, GroupServiceServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.css']
})
export class EditGroupComponent  extends AppComponentBase  implements OnInit {
  id: string;
  saving = false;
  group = new GroupDto();
  @Output() onSave = new EventEmitter<any>();
  constructor(
    injector: Injector,
    private _groupService: GroupServiceServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector)
  }
  ngOnInit() {
    this._groupService
      .get(this.id)
      .subscribe((result: GroupDto) => {
        this.group = result;
        console.log(this.group)
      });
  }
  save(): void {
    this.saving = true;

    const group = new GroupDto();
    group.init(this.group);
    console.log(group)
    this._groupService
      .update(group)
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
