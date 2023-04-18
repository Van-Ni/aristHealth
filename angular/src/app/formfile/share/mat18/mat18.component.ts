import { Component, Input, OnInit } from '@angular/core';
import { UpdateCertificateGroupStatusDto } from '@shared/service-proxies/service-proxies';
import { PermissionCheckerService } from 'abp-ng2-module';
import { DefaultModel } from '../KetLuanPhanLoai/KetLuanPhanLoai.component';

@Component({
  selector: 'app-mat18',
  templateUrl: './mat18.component.html',
  styleUrls: ['./mat18.component.css']
})
export class Mat18Component {
  @Input() klplModel: DefaultModel ;
  @Input() inputModel: UpdateCertificateGroupStatusDto;
  @Input() save: Function;
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