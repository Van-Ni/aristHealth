import {
  Component,
  Injector,
  OnInit,
  EventEmitter,
  Output} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { forEach as _forEach, includes as _includes, map as _map } from 'lodash-es';
import { AppComponentBase } from '@shared/app-component-base';
import {
  UserServiceProxy,
  UserDto,
  RoleDto
} from '@shared/service-proxies/service-proxies';

@Component({
  templateUrl: './edit-user-dialog.component.html'
})
  export class EditUserDialogComponent extends AppComponentBase
    implements OnInit {
    saving = false;
    user = new UserDto();
    roles: RoleDto[] = [];
    fileToUpload: File = null;
    checkedRolesMap: { [key: string]: boolean } = {};
    id: number;
    url: string = '';
    files: Array<any> = new Array<any>();
    @Output() onSave = new EventEmitter<any>();

    constructor(
      injector: Injector,
      public _userService: UserServiceProxy,
      public bsModalRef: BsModalRef,
    ) {
      super(injector);
    }

    ngOnInit(): void {
      this._userService.get(this.id).subscribe((result) => {
        this.user = result;
        this._userService.getRoles().subscribe((result2) => {
          this.roles = result2.items;
          this.setInitialRolesStatus();
        });
      });
    }

    setInitialRolesStatus(): void {
      _map(this.roles, (item) => {
        this.checkedRolesMap[item.normalizedName] = this.isRoleChecked(
          item.normalizedName
        );
      });
    }

    isRoleChecked(normalizedName: string): boolean {
      return _includes(this.user.roleNames, normalizedName);
    }

    onRoleChange(role: RoleDto, $event) {
      this.checkedRolesMap[role.normalizedName] = $event.target.checked;
    }

    getCheckedRoles(): string[] {
      const roles: string[] = [];
      _forEach(this.checkedRolesMap, function (value, key) {
        if (value) {
          roles.push(key);
        }
      });
      return roles;
    }
    onSelectFile(files: FileList){
      if (files.length === 0)
      return;

      this.fileToUpload = files.item(0);


      const fileReader: FileReader = new FileReader();
      fileReader.readAsDataURL(this.fileToUpload);

      fileReader.onload = (event: any) => {
        this.url = event.target.result;
      };

      this.files.push({ data: this.fileToUpload, fileName: this.fileToUpload.name });

      this._userService.uploadSignPath(this.user.id,this.files[0])
        .subscribe((result: UserDto) => {
          this.user.signPath = result.signPath;
      });
    }
    save(): void {
      this.saving = true;

      this.user.roleNames = this.getCheckedRoles();

      this._userService.update(this.user).subscribe(
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
