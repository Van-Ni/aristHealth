import { Component, Input, OnInit } from '@angular/core';
import { CertificateGroupStatusDto } from '@shared/service-proxies/service-proxies';
import { PermissionCheckerService } from 'abp-ng2-module';
import { Selections } from '../../current-conclusion-type1/current-conclusion-type1.component';

@Component({
  selector: 'app-xet-nghiem-ma-tuy-va-mau',
  templateUrl: './xet-nghiem-ma-tuy-va-mau.component.html',
  styleUrls: ['./xet-nghiem-ma-tuy-va-mau.component.css']
})
export class XetNghiemMaTuyVaMauComponent implements OnInit {

  @Input() inputModel: CertificateGroupStatusDto;
  @Input() save: Function;
  // options: Selections[] = [
  // ];
  constructor(protected _permissionChecker: PermissionCheckerService) { }
  ngOnInit(): void {
    // this.options = [
    //   {
    //     value: `Âm tính`,
    //     realvalue: `0`,
    //   },
    //   {
    //     value: `Dương tính`,
    //     realvalue: `1`,
    //   },
    // ]
  }
  mySave() {
    this.save(this.inputModel)
  }

}
