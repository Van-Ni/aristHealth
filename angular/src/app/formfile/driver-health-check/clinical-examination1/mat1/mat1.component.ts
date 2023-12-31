import { Component, Input, OnInit } from '@angular/core';
import { CreateCertificateGroupStatusDto, UpdateCertificateGroupStatusDto } from '@shared/service-proxies/service-proxies';
import { PermissionCheckerService } from 'abp-ng2-module';
export interface Mat1Model{
  ketluanTitle: string,
  optionsKetLuan: string[],
  phanloaiTitle: string,
  optionsPhanLoai: string[],
}
@Component({
  selector: 'app-mat1',
  templateUrl: './mat1.component.html',
  styleUrls: ['./mat1.component.css']
})
export class Mat1Component {
  @Input() mat1Model: Mat1Model ;
  @Input() inputModel: UpdateCertificateGroupStatusDto;
  @Input() save: Function;
  editClicked = false;
  constructor(protected _permissionChecker: PermissionCheckerService) { }
  mySave() {
    console.log("a",this.inputModel.content['checkbox_mumau_xanh'].value);
    
    if(!this.inputModel.content['checkbox_mumau_xanh'].value)
    {
      this.inputModel.content['checkbox_mumau_xanh'].value = null;
    }
    if(!this.inputModel.content['checkbox_bth'].value)
    {
      this.inputModel.content['checkbox_bth'].value = null;
    }
    if(!this.inputModel.content['checkbox_mumau_all'].value)
    {
      this.inputModel.content['checkbox_mumau_all'].value = null;
    }
    if(!this.inputModel.content['checkbox_mumau_do'].value)
    {
      this.inputModel.content['checkbox_mumau_do'].value = null;
    }
    if(!this.inputModel.content['checkbox_mumau_vang'].value)
    {
      this.inputModel.content['checkbox_mumau_vang'].value = null;
    }
    this.save(this.inputModel)
  }
  isEdited() {
    //
    if(this._permissionChecker.isGranted('Pages.' +this.inputModel.group))
    {
      if(this.inputModel.status!=1) return true;
      else if (this.editClicked) return true;
    }
    return false;
  }
}
