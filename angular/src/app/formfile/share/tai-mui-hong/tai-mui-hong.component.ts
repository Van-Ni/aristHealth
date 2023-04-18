import { Component, Input, OnInit } from '@angular/core';
import { CreateCertificateGroupStatusDto, UpdateCertificateGroupStatusDto } from '@shared/service-proxies/service-proxies';
import { PermissionCheckerService } from 'abp-ng2-module';
import { DefaultModel } from '../KetLuanPhanLoai/KetLuanPhanLoai.component';

@Component({
  selector: 'app-tai-mui-hong',
  templateUrl: './tai-mui-hong.component.html',
  styleUrls: ['./tai-mui-hong.component.css']
})
export class TaiMuiHongComponent {
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
