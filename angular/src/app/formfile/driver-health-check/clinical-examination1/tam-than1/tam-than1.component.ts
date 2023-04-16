import { Component, Injector, Input, OnInit } from '@angular/core';
import { CertificateKeyValueComponentBase } from '@app/manager/base-certificate';
import { DataService } from '@app/services/data.service';
import { AppComponentBase } from '@shared/app-component-base';
import { CertificateGroupStatusDto, CreateCertificateGroupStatusDto, KeyValues, KhoaTamThanServiceServiceProxy, Values } from '@shared/service-proxies/service-proxies';
import { PermissionCheckerService } from 'abp-ng2-module';
interface TamThan1ViewModel {
  tamthan_selectbox_phanloai: string;
  tamthan_text_tamthan_ketluan: string;
}
@Component({
  selector: 'app-tam-than1',
  templateUrl: './tam-than1.component.html',
  styleUrls: ['./tam-than1.component.css']
})
export class TamThan1Component  extends CertificateKeyValueComponentBase<TamThan1ViewModel>  implements OnInit {
  setViewModel(model: any) {
    for (const key in this.tamthan1) {
      if (Object.prototype.hasOwnProperty.call(this.tamthan1, key)) {
        const item = model.items.find(i => i.key === key);
        if(item){
          this.tamthan1[key] = item.value;
        }
      }
    }
  }
  tamthan1: TamThan1ViewModel={
    tamthan_selectbox_phanloai: 'Bình thường',
    tamthan_text_tamthan_ketluan: 'Đủ sức khỏe'
  };
  @Input() Data: any;
  @Input() statusDataCheck: any;
  keys = [""];
  isEditable6= false;
  certificateId: string;
  certificateStatus: CertificateGroupStatusDto;
  status = false;
  constructor(private _permissionChecker: PermissionCheckerService,private dataservice: DataService,private injector: Injector, private khoaTamThanServiceServiceProxy: KhoaTamThanServiceServiceProxy) {
    super(injector, dataservice)
    this.group = "tamthan";
   }
  
  ngOnInit() {
    super.ngOnInit();
    
    if(this._permissionChecker.isGranted("Pages.TamThan.Create")){
      this.isEditable6 = true;
    }
  }
  save(): void{
    const data  =  {
      keys: {
        "tamthan_selectbox_phanloai": new Values({ value: this.tamthan1.tamthan_selectbox_phanloai }),
        "tamthan_text_tamthan_ketluan": new Values({ value: this.tamthan1.tamthan_text_tamthan_ketluan })
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
      this.khoaTamThanServiceServiceProxy.updateOrInsert(input).subscribe(
        () => {
          this.notify.info(this.l('SavedSuccessfully.'));
          this.dataservice.refreshData(this.certificateId);
        },
      );
    }else{
      this.khoaTamThanServiceServiceProxy.createList(input).subscribe(
        () => {
          this.notify.info(this.l('SavedSuccessfully.'));
          this.dataservice.refreshData(this.certificateId);
        },
      );
    }
  }


}
