import { Component, Input, OnInit } from '@angular/core';
import { CertificateGroupStatusDto } from '@shared/service-proxies/service-proxies';
import { PermissionCheckerService } from 'abp-ng2-module';
@Component({
  selector: 'app-physical-examination',
  templateUrl: './physical-examination.component.html',
  styleUrls: ['./physical-examination.component.css']
})
export class PhysicalExaminationComponent implements OnInit {
  @Input() save: Function;
  @Input() Data: CertificateGroupStatusDto;
  @Input() huyketluan: Function;
  constructor(protected _permissionChecker: PermissionCheckerService) { }
  ngOnInit(): void {
  }
  mySave() {
    this.save(this.Data)
  }
  huy()
  {
    this.huyketluan(this.Data)
  }
}
