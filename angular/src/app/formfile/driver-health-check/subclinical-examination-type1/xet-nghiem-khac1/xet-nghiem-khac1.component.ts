import { Component, Input, OnInit } from '@angular/core';
import { CertificateGroupStatusDto } from '@shared/service-proxies/service-proxies';
import { PermissionCheckerService } from 'abp-ng2-module';

@Component({
  selector: 'app-xet-nghiem-khac1',
  templateUrl: './xet-nghiem-khac1.component.html',
  styleUrls: ['./xet-nghiem-khac1.component.css']
})
export class XetNghiemKhac1Component  {
  @Input() inputModel: CertificateGroupStatusDto;
  @Input() save: Function;
  constructor(protected _permissionChecker: PermissionCheckerService) { }
  mySave() {
    console.log(this.inputModel)
    this.save(this.inputModel)
  }
}
