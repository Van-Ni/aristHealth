import { Component, Injector, Input, OnInit } from '@angular/core';
import { CertificateKeyValueComponentBase } from '@app/manager/base-certificate';
import { DataService } from '@app/services/data.service';
import { AppComponentBase } from '@shared/app-component-base';
import { CertificateGroupStatusDto, CreateMedicationKeyResultDto, KhoaThaiSanServiceServiceProxy } from '@shared/service-proxies/service-proxies';
import { PermissionCheckerService } from 'abp-ng2-module';
interface ThaiSan1ViewModel {
  thaisan_text_noidung: string;
  thaisan_selectbox_phanloai: string;
  thaisan_text_thaisan_ketluan: string;
}
@Component({
  selector: 'app-thai-san1',
  templateUrl: './thai-san1.component.html',
  styleUrls: ['./thai-san1.component.css']
})
export class ThaiSan1Component extends CertificateKeyValueComponentBase<ThaiSan1ViewModel> implements OnInit {
  setViewModel(model: any) {
    let object = Object.fromEntries(new Map(model.items.map(obj=>{
      return [obj.key, obj.value]
    })));
    this.thaisan1 = object as unknown as ThaiSan1ViewModel;
  }
  thaisan1: ThaiSan1ViewModel;
  @Input() statusDataCheck: any;
  @Input() Data: any;
  keys = [""];
  isEditable7= false;
  certificateId: string;
  certificateStatus: CertificateGroupStatusDto;
  status = false;
  constructor(private _permissionChecker: PermissionCheckerService,private dataservice: DataService,private injector: Injector, private khoaThaiSanServiceServiceProxy: KhoaThaiSanServiceServiceProxy) { 
    super(injector, dataservice)
    this.group = "thaisan";
   }
  
  ngOnInit() {
    super.ngOnInit();
    if(this._permissionChecker.isGranted("Pages.ThaiSan.Create")){
      this.isEditable7 = true;
    }

  }
  save(): void{
    var inputthaisan1s : CreateMedicationKeyResultDto[] = [];
    const item1 = new CreateMedicationKeyResultDto(
      {
        key: 'thaisan_selectbox_phanloai',
        value:  this.thaisan1.thaisan_selectbox_phanloai|| '',
        certificateId: this.certificateId,  
        group: this.group,
      }
    );const item2 = new CreateMedicationKeyResultDto(
      {
        key: 'thaisan_text_thaisan_ketluan',
        value:  this.thaisan1.thaisan_text_thaisan_ketluan|| '',
        certificateId: this.certificateId,
        group: this.group,
      }
    );
    inputthaisan1s.push(item1);
    inputthaisan1s.push(item2);
    if(this.status == true){
      this.khoaThaiSanServiceServiceProxy.updateOrInsert(inputthaisan1s).subscribe(
        () => {
          this.notify.info(this.l('SavedSuccessfully.'));
          this.dataservice.refreshData(this.certificateId);
        },
      );
    }else{
      this.khoaThaiSanServiceServiceProxy.createList(inputthaisan1s).subscribe(
        () => {
          this.notify.info(this.l('SavedSuccessfully.'));
          this.dataservice.refreshData(this.certificateId);
        },
      );
    }
  }


}
