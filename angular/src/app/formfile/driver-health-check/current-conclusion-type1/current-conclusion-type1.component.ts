import { Component, Input, OnInit } from '@angular/core';
import { PermissionCheckerService } from 'abp-ng2-module';
import { ClinicalExaminationModel } from '../clinical-examination1/clinical-examination1.component';
import { CertificateGroupStatusDto } from '@shared/service-proxies/service-proxies';
import { DefaultModel } from '@app/formfile/share/KetLuanPhanLoai/KetLuanPhanLoai.component';
@Component({
  selector: 'app-current-conclusion-type1',
  templateUrl: './current-conclusion-type1.component.html',
  styleUrls: ['./current-conclusion-type1.component.css']
})
export class CurrentConclusionType1Component implements OnInit {
  @Input() save: Function;
  @Input() Data: CertificateGroupStatusDto;
  @Input() huyketluan: Function;
  @Input() hang: string;
  @Input() defaultModel: DefaultModel ;
  showForm = false;
  constructor(protected _permissionChecker: PermissionCheckerService) { }

  check(value: boolean){
      this.showForm = value;
      console.log(this.showForm);
      
  }

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

