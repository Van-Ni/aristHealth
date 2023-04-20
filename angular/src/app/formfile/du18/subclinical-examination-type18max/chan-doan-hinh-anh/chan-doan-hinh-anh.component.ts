import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { DefaultModel } from '@app/formfile/share/KetLuanPhanLoai/KetLuanPhanLoai.component';
import { CertificateGroupStatusDto } from '@shared/service-proxies/service-proxies';
import { PermissionCheckerService } from 'abp-ng2-module';

@Component({
  selector: 'app-chan-doan-hinh-anh',
  templateUrl: './chan-doan-hinh-anh.component.html',
  styleUrls: ['./chan-doan-hinh-anh.component.css']
})
export class ChanDoanHinhAnhComponent implements OnInit{
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

    if(this._permissionChecker.isGranted('Pages.' +this.inputModel.group))
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
