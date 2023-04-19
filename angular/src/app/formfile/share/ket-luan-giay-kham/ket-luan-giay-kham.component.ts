import { Component, Input, OnInit } from '@angular/core';
import { CertificateGroupStatusDto } from '@shared/service-proxies/service-proxies';
import { PermissionCheckerService } from 'abp-ng2-module';
import { DefaultModel } from '../KetLuanPhanLoai/KetLuanPhanLoai.component';

@Component({
  selector: 'app-ket-luan-giay-kham',
  templateUrl: './ket-luan-giay-kham.component.html',
  styleUrls: ['./ket-luan-giay-kham.component.css']
})
export class KetLuanGiayKhamComponent implements OnInit {
  @Input() save: Function;
  @Input() Data: CertificateGroupStatusDto;
  @Input() huyketluan: Function;
  @Input() defaultModel: DefaultModel ;
  isValid: boolean = true;
  isValid1: boolean = true;

  validateInput() {
    this.isValid = !!this.Data.content['text_ketluan'].value;
    this.isValid1=!!this.Data.content['text_noidung'].value
  }
  constructor(protected _permissionChecker: PermissionCheckerService) { }



  ngOnInit(): void {
  }
  mySave() {
    this.save(this.Data)
  }
  huy(): void
  {
    this.huyketluan(this.Data)
  }
}

