import { ChangeDetectorRef, Component, Injector, Input, OnInit } from '@angular/core';
import { CertificateKeyValueComponentBase } from '@app/manager/base-certificate';
import { DataService } from '@app/services/data.service';
import { CertificateGroupStatusDto, Values } from '@shared/service-proxies/service-proxies';
import { PermissionCheckerService } from 'abp-ng2-module';
import { Du18Model } from '../du18/du18.component';
import { DefaultModel } from '../share/KetLuanPhanLoai/KetLuanPhanLoai.component';
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
