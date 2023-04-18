import { Component, Input, OnInit } from '@angular/core';
import { DefaultModel } from '@app/formfile/share/KetLuanPhanLoai/KetLuanPhanLoai.component';
import { UpdateCertificateGroupStatusDto } from '@shared/service-proxies/service-proxies';
import { PermissionCheckerService } from 'abp-ng2-module';

@Component({
  selector: 'app-tai-mui-hong-laixe',
  templateUrl: './tai-mui-hong-laixe.component.html',
  styleUrls: ['./tai-mui-hong-laixe.component.css']
})
export class TaiMuiHongLaixeComponent {
  @Input() defaultModel: DefaultModel ;
  @Input() inputModel: UpdateCertificateGroupStatusDto;
  @Input() save: Function;
  editClicked = false;
  constructor(protected _permissionChecker: PermissionCheckerService) { }
  mySave() {
    this.save(this.inputModel)
  }
  isEdited() {
    //
    if(this._permissionChecker.isGranted(this.inputModel.group) && this.inputModel.status!=1) 
    { return true;
    }
    return false;
  }
}