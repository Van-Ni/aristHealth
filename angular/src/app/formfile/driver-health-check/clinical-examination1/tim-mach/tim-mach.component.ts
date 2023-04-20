import { Component, Input, OnInit } from '@angular/core';
import { CertificateGroupStatusDto, CreateCertificateGroupStatusDto, UpdateCertificateGroupStatusDto } from '@shared/service-proxies/service-proxies';
import { PermissionCheckerService } from 'abp-ng2-module';
export interface TimMachModel{
  ketluanTitle: string,
  optionsKetLuan: string[],
  phanloaiTitle: string,
  optionsPhanLoai: string[],
}
@Component({
  selector: 'app-tim-mach',
  templateUrl: './tim-mach.component.html',
  styleUrls: ['./tim-mach.component.css']
})
export class TimMachComponent  {
  @Input() mat1Model: TimMachModel ;
  @Input() inputModel: CertificateGroupStatusDto;
  @Input() save: Function;
  editClicked = false;
  constructor(protected _permissionChecker: PermissionCheckerService) { }
  mySave() {
    console.log(this.inputModel)
    this.save(this.inputModel)
  }
  isEdited() {
    //
    if(this._permissionChecker.isGranted('Pages.' +this.inputModel.group))
    {
      if(this.inputModel.status!=1) return true;
      else if (this.editClicked) return true;
    }
    return false;
  }
}
