import { Component, Input, OnInit } from '@angular/core';
import { CreateCertificateGroupStatusDto, UpdateCertificateGroupStatusDto } from '@shared/service-proxies/service-proxies';
import { PermissionCheckerService } from 'abp-ng2-module';
export interface Mat1Model{
  ketluanTitle: string,
  optionsKetLuan: string[],
  phanloaiTitle: string,
  optionsPhanLoai: string[],
}
@Component({
  selector: 'app-mat1',
  templateUrl: './mat1.component.html',
  styleUrls: ['./mat1.component.css']
})
export class Mat1Component {
  @Input() mat1Model: Mat1Model ;
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
