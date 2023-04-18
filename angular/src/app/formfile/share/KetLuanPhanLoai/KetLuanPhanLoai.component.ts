import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { CertificateGroupStatusDto } from '@shared/service-proxies/service-proxies';
import { PermissionCheckerService } from 'abp-ng2-module';

export interface DefaultModel{
  ketluanTitle: string,
  optionsKetLuan: string[],
  phanloaiTitle: string,
  optionsPhanLoai: string[],
}
@Component({
  selector: 'app-KetLuanPhanLoai',
  templateUrl: './KetLuanPhanLoai.component.html',
  styleUrls: ['./KetLuanPhanLoai.component.css']
})
export class KetLuanPhanLoaiComponent implements OnInit{
  @Input() defaultModel: DefaultModel ;
  @Input() inputModel: CertificateGroupStatusDto
  @Input() save: Function;
  editClicked = false;
  constructor(protected _permissionChecker: PermissionCheckerService,private cdr: ChangeDetectorRef) { }
  ngOnInit(): void {
  }


  mySave() {
    this.save(this.inputModel)
  }
  isEdited() {
    if(this._permissionChecker.isGranted(this.inputModel.group))
    {
      if(this.inputModel.status!=1) return true;
      else if (this.editClicked) return true;
    }
    return false;
  }
  onEditClicked() {
    this.editClicked = !this.editClicked;
    this.cdr.detectChanges(); // Force view update
    console.log(this.editClicked);

  }

}
