import {
  Component,
  Injector,
  OnInit,
  EventEmitter,
  Output,
} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AppComponentBase } from '@shared/app-component-base';
declare var $: any;
import {
  RoleServiceProxy,
  RoleDto,
  PermissionDto,
  CreateRoleDto,
  PermissionDtoListResultDto
} from '@shared/service-proxies/service-proxies';
import { forEach as _forEach, map as _map } from 'lodash-es';

@Component({
  templateUrl: 'create-role-dialog.component.html'
})
export class CreateRoleDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  role = new RoleDto();
  permissions: PermissionDto[] = [];
  parentRoles: PermissionDto[] = [];
  childRoles: PermissionDto[] = [];
  checkedPermissionsMap: { [key: string]: boolean } = {};
  defaultPermissionCheckedStatus = true;

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _roleService: RoleServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this._roleService
      .getAllPermissions()
      .subscribe((result: PermissionDtoListResultDto) => {
        this.permissions = result.items;
        this.splitRoles(result.items);
        this.setInitialPermissionsStatus();
      });
  }
  splitRoles(items: any[]) {
    const parentRoles = [];
    const childRoles = [];
    items.forEach((item, index) => {
      if (item.name.match(/\./g)?.length === 1) {
        parentRoles.push({ ...item, id: index });
      } else if (item.name.match(/\./g)?.length === 2) {
        childRoles.push({ ...item, id: index });
      }
    });
    this.parentRoles = parentRoles;
    this.childRoles = childRoles;
  }

  getChildPermissions(permissionName: string) {
    return this.childRoles.filter(child => {
      return child.name.substring(0, child.name.lastIndexOf('.')) === permissionName;
    });
  }
  setInitialPermissionsStatus(): void {
    _map(this.permissions, (item) => {
      this.checkedPermissionsMap[item.name] = this.isPermissionChecked(
        item.name
      );
    });
  }

  isPermissionChecked(permissionName: string): boolean {
    // just return default permission checked status
    // it's better to use a setting
    return this.defaultPermissionCheckedStatus;
  }

  onPermissionChange(permission: PermissionDto, $event) {
    this.checkedPermissionsMap[permission.name] = $event.target.checked;
    const item = $($event.target);
    const checkboxes = item.closest(".container-checkbox")
      .find(".child-checkbox > input[type='checkbox']");

    checkboxes
      .prop('checked', $event.target.checked);

    const names = checkboxes.map(function (item: any) {
      return $(this).attr("name");
    }).get();
    names.forEach((name: string) => {
      this.checkedPermissionsMap[name] = $event.target.checked;
    });

  }
  onPermissionChildChange(permission: PermissionDto, $event) {
    this.checkedPermissionsMap[permission.name] = $event.target.checked;
  }

  checkAllElement($event) {
    const item = $($event.target);
    const checkboxes = item.closest(".container-checkall")
      .find(".checkbox-items input[type='checkbox']");
    checkboxes.prop('checked', $event.target.checked);
    const names = checkboxes.map(function (item: any) {
      return $(this).attr("name");
    }).get();
    if($event.target.checked){
      names.forEach((name: string) => {
        this.checkedPermissionsMap[name] = $event.target.checked;
      });
    }else{
      this.checkedPermissionsMap = {};
    }
  }
  getCheckedPermissions(): string[] {
    const permissions: string[] = [];
    _forEach(this.checkedPermissionsMap, function (value, key) {
      if (value) {
        permissions.push(key);
      }
    });
    return permissions;
  }

  save(): void {
    this.saving = true;

    const role = new CreateRoleDto();
    role.init(this.role);
    role.grantedPermissions = this.getCheckedPermissions();
    console.log(role.grantedPermissions);
    this._roleService
      .create(role)
      .subscribe(
        () => {
          this.notify.info(this.l('Lưu thành công'));
          this.bsModalRef.hide();
          this.onSave.emit();
        },
        () => {
          this.saving = false;
        }
      );
  }
}
