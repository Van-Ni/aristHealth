import { Component, Input, OnInit } from '@angular/core';
import { CreateCertificateGroupStatusDto } from '@shared/service-proxies/service-proxies';
import { PermissionCheckerService } from 'abp-ng2-module';

@Component({
  selector: 'app-KetLuanPhanLoai',
  templateUrl: './KetLuanPhanLoai.component.html',
  styleUrls: ['./KetLuanPhanLoai.component.css']
})
export class KetLuanPhanLoaiComponent implements OnInit {
  @Input() ketluanTitle: string
  @Input() phanloaiTitle: string
  @Input() inputModel: CreateCertificateGroupStatusDto
  @Input() save: Function;
  constructor(protected _permissionChecker: PermissionCheckerService) { }
  ngOnInit(): void {
    console.log(this.ketluanTitle)
  }
}
