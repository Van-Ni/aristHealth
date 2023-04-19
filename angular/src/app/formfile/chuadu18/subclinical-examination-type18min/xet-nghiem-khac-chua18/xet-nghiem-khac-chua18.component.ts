import { Component, Input, OnInit } from '@angular/core';
import { CertificateGroupStatusDto } from '@shared/service-proxies/service-proxies';
import { PermissionCheckerService } from 'abp-ng2-module';

@Component({
  selector: 'app-xet-nghiem-khac-chua18',
  templateUrl: './xet-nghiem-khac-chua18.component.html',
  styleUrls: ['./xet-nghiem-khac-chua18.component.css']
})
export class XetNghiemKhacChua18Component  {

  @Input() inputModel: CertificateGroupStatusDto;
  @Input() save: Function;
  constructor(protected _permissionChecker: PermissionCheckerService) { }
  mySave() {
    console.log(this.inputModel)
    this.save(this.inputModel)
  }
}
