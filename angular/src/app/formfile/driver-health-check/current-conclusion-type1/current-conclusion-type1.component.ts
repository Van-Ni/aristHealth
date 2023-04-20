import { Component, Input, OnInit } from '@angular/core';
import { PermissionCheckerService } from 'abp-ng2-module';
import { ClinicalExaminationModel } from '../clinical-examination1/clinical-examination1.component';
import { CertificateGroupStatusDto } from '@shared/service-proxies/service-proxies';
import { DefaultModel } from '@app/formfile/share/KetLuanPhanLoai/KetLuanPhanLoai.component';
export class Selections {
  value: string;
  realvalue: string;
  isSelected: boolean;
}
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
  @Input() defaultModel: DefaultModel;
  options: Selections[] = [
  ];
  showForm = false;
  constructor(protected _permissionChecker: PermissionCheckerService) { }

  check(value: boolean) {
    this.showForm = value;
    console.log(this.showForm);
  }

  ngOnInit(): void {
    this.options = [
      {
        value: `Đủ điều kiện lái xe hạng ${this.hang}`,
        isSelected: true,
        realvalue: `A0-1`,
      },
      {
        value: `Không đủ điều kiện lái xe hạng ${this.hang}`,
        isSelected: false,
        realvalue: `A0-2`,
      },
      {
        value: `Đủ điều kiện lại xe hạng ${this.hang} nhưng cần khám lại`,
        isSelected: false,
        realvalue: `A0-3`,
      }      
    ]
    console.log(this.options, this.Data?.content["text_ketluan"])
  }
  mySave() {
    let title = this.options.find(o=>o.realvalue == this.Data.content['text_ketluan'].realValue)
    this.Data.content['text_ketluan'].value = title.value;
    console.log(this.Data);
    this.save(this.Data)
  }
  huy(): void {
    this.huyketluan(this.Data)
  }
}

