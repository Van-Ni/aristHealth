import {
  Component,
  Injector,
  OnInit,
  EventEmitter,
  Output,
} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { forEach as _forEach, includes as _includes, map as _map } from 'lodash-es';
import { AppComponentBase } from '@shared/app-component-base';
import {
  RoleServiceProxy,
  GetRoleForEditOutput,
  RoleDto,
  PermissionDto,
  RoleEditDto,
  FlatPermissionDto
} from '@shared/service-proxies/service-proxies';
declare var $: any;
@Component({
  templateUrl: 'edit-role-dialog.component.html'
})
export class EditRoleDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  id: number;
  role = new RoleEditDto();
  permissions: FlatPermissionDto[];
  grantedPermissionNames: string[];
  checkedPermissionsMap: { [key: string]: boolean } = {};
  parentRoles: PermissionDto[] = [];
  childRoles: PermissionDto[] = [];
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
      .getRoleForEdit(this.id)
      .subscribe((result: GetRoleForEditOutput) => {
        this.role = result.role;
        this.permissions = result.permissions;
        this.splitRoles(result.permissions);
        this.grantedPermissionNames = result.grantedPermissionNames;
        console.log(result.permissions, result.grantedPermissionNames);
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
    let isChecked = this.grantedPermissionNames.find(item => {
      return item === permissionName;
    });

    return isChecked ? true : false;
    return _includes(this.grantedPermissionNames, permissionName);
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
    if ($event.target.checked) {
      names.forEach((name: string) => {
        this.checkedPermissionsMap[name] = $event.target.checked;
      });
    } else {
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

    const role = new RoleDto();
    role.init(this.role);
    role.grantedPermissions = this.getCheckedPermissions();
    this._roleService.update(role).subscribe(
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
