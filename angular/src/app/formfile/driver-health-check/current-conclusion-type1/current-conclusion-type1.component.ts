import { Component, Input, OnInit } from '@angular/core';
import { PermissionCheckerService } from 'abp-ng2-module';
import { ClinicalExaminationModel } from '../clinical-examination1/clinical-examination1.component';
import { CertificateGroupStatusDto } from '@shared/service-proxies/service-proxies';
@Component({
  selector: 'app-current-conclusion-type1',
  templateUrl: './current-conclusion-type1.component.html',
  styleUrls: ['./current-conclusion-type1.component.css']
})
export class CurrentConclusionType1Component implements OnInit {
  @Input() save: Function;
  @Input() Data: CertificateGroupStatusDto;
  constructor(protected _permissionChecker: PermissionCheckerService) { }
  ngOnInit(): void {
    console.log("kl ne",this.Data)
  }
  mySave() {
    this.save(this.Data)
  }

}

