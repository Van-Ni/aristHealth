import { Component, Input, OnInit } from '@angular/core';
import { CertificateGroupStatusDto } from '@shared/service-proxies/service-proxies';
import { PermissionCheckerService } from 'abp-ng2-module';

@Component({
  selector: 'app-xet-nghiem-ma-tuy-va-mau',
  templateUrl: './xet-nghiem-ma-tuy-va-mau.component.html',
  styleUrls: ['./xet-nghiem-ma-tuy-va-mau.component.css']
})
export class XetNghiemMaTuyVaMauComponent {

  @Input() inputModel: CertificateGroupStatusDto;
  @Input() save: Function;
  constructor(protected _permissionChecker: PermissionCheckerService) { }
  mySave() {
    this.save(this.inputModel)
  }

}
