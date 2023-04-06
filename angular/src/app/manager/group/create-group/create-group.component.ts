import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { DepartmentDto, DepartmentServiceServiceProxy, GroupDto, GroupServiceServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent extends AppComponentBase implements OnInit {
  saving = false;
  group = new GroupDto();
  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _groupService: GroupServiceServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit() {
  }
  save(): void {
    this.saving = true;

    const group = new GroupDto();
    group.init(this.group);
    console.log(group)
    this._groupService
      .create(group)
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
