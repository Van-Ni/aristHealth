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
  optionXetNghiemMaTuys: Selections[] = [
  ];
  constructor(protected _permissionChecker: PermissionCheckerService) { }
  ngOnInit(): void {
    this.optionXetNghiemMaTuys = [
      {
        value: `Âm tính`,
        realvalue: `0`,
      },
      {
        value: `Dương tính`,
        realvalue: `1`,
      },
    ]
  }
  mySave() {
    let title1 = this.optionXetNghiemMaTuys.find(o=>o.realvalue == this.inputModel.content['text_morphin'].realValue)
    this.inputModel.content['text_morphin'].value = title1.value;
    let title2 = this.optionXetNghiemMaTuys.find(o=>o.realvalue == this.inputModel.content['text_amphetamin'].realValue)
    this.inputModel.content['text_amphetamin'].value = title2.value;
    let title3 = this.optionXetNghiemMaTuys.find(o=>o.realvalue == this.inputModel.content['text_methamphetamin'].realValue)
    this.inputModel.content['text_methamphetamin'].value = title3.value;
    let title4 = this.optionXetNghiemMaTuys.find(o=>o.realvalue == this.inputModel.content['text_marijuana'].realValue)
    this.inputModel.content['text_marijuana'].value = title4.value;
    this.inputModel.content['text_nongdomau'].realValue = this.inputModel.content['text_nongdomau'].realValue;
    this.inputModel.content['text_nongdomau'].value += " mg/l"
    this.save(this.inputModel)
  }

}
