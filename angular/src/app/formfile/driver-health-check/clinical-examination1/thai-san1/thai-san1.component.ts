import { Component, Injector, Input, OnInit } from '@angular/core';
import { CertificateKeyValueComponentBase } from '@app/manager/base-certificate';
import { DataService } from '@app/services/data.service';
import { AppComponentBase } from '@shared/app-component-base';
import { CertificateGroupStatusDto, CreateCertificateGroupStatusDto, KeyValues, KhoaThaiSanServiceServiceProxy, Values } from '@shared/service-proxies/service-proxies';
import { PermissionCheckerService } from 'abp-ng2-module';
interface ThaiSan1ViewModel {
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
    for (const key in this.thaisan1) {
      if (Object.prototype.hasOwnProperty.call(this.thaisan1, key)) {
        const item = model.items.find(i => i.key === key);
        if(item){
          this.thaisan1[key] = item.value;
        }
      }
    }
  }
  thaisan1: ThaiSan1ViewModel = {
    thaisan_selectbox_phanloai: 'Bình thường',
    thaisan_text_thaisan_ketluan: 'Đủ sức khỏe'
  };
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
    const data  =  {
      keys: {
        "thaisan_selectbox_phanloai": new Values({ value: this.thaisan1.thaisan_selectbox_phanloai }),
        "thaisan_text_thaisan_ketluan": new Values({ value: this.thaisan1.thaisan_text_thaisan_ketluan })
      }
    };
    const input = new CreateCertificateGroupStatusDto(
      {
        userId : this.appSession.userId,
        certificateId: this.certificateId,
        group: this.group,
        status : false,
        content : new KeyValues(data),
      }
    );
    if(this.status == true){
      this.khoaThaiSanServiceServiceProxy.updateOrInsert(input).subscribe(
        () => {
          this.notify.info(this.l('SavedSuccessfully.'));
          this.dataservice.refreshData(this.certificateId);
        },
      );
    }else{
      this.khoaThaiSanServiceServiceProxy.createList(input).subscribe(
        () => {
          this.notify.info(this.l('SavedSuccessfully.'));
          this.dataservice.refreshData(this.certificateId);
        },
      );
    }
  }


}
