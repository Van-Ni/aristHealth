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
  isDisabled : boolean;
  calculateBMI(){
    let cc = +this.Data.content['text_chieucao'].value/100;
    let cn = +this.Data.content['text_cannang'].value
    if(cc != 0){
      this.Data.content['text_chisobmi'].value =''+ Math.round(cn/(cc*cc) * 100) / 100;
    }
  };
  constructor(protected _permissionChecker: PermissionCheckerService) { }
  ngOnInit(): void {
    console.log('Pages.' +this.Data.group+'_input');
    console.log('Pages.' +this.Data.group);
    if(this._permissionChecker.isGranted('Pages.' + this.Data.group))
    {
      this.isDisabled = false;
      console.log("1");


    }else if(this._permissionChecker.isGranted('Pages.' + this.Data.group + '_input'))
    {
      this.isDisabled = false;
      this.Data.group = this.Data.group + '_input';
      console.log("2");

    }
    else
    {
      this.isDisabled = true;
    }
  }
  mySave() {
    this.save(this.Data)
  }
  huy()
  {
    this.huyketluan(this.Data)
  }
}
