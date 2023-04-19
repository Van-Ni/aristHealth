import { Component, Input, OnInit } from '@angular/core';
import { UpdateCertificateGroupStatusDto } from '@shared/service-proxies/service-proxies';
import { PermissionCheckerService } from 'abp-ng2-module';
import { DefaultModel } from '../KetLuanPhanLoai/KetLuanPhanLoai.component';

@Component({
  selector: 'app-rang-ham-mat',
  templateUrl: './rang-ham-mat.component.html',
  styleUrls: ['./rang-ham-mat.component.css']
})
export class RangHamMatComponent {
  @Input() klplModel: DefaultModel ;
  @Input() inputModel: UpdateCertificateGroupStatusDto;
  @Input() save: Function;
  @Input() check: number;
  editClicked = false;
  constructor(protected _permissionChecker: PermissionCheckerService) { }
  mySave() {
    this.save(this.inputModel)
  }
  isEdited() {
    //
    if(this._permissionChecker.isGranted(this.inputModel.group))
    {
      if(this.inputModel.status!=1) return true;
      else if (this.editClicked) return true;
    }
    return false;
  }
}