import { Component, Injector, Input, OnInit } from '@angular/core';
import { CertificateKeyValueComponentBase } from '@app/manager/base-certificate';
import { DataService } from '@app/services/data.service';
import { AppComponentBase } from '@shared/app-component-base';
import { CertificateGroupStatusDto, CreateCertificateGroupStatusDto, KeyValues, KhoaThanKinhServiceServiceProxy, Values } from '@shared/service-proxies/service-proxies';
import { PermissionCheckerService } from 'abp-ng2-module';
interface ThanKinh1ViewModel {
  thankinh_selectbox_phanloai: string;
  thankinh_text_thankinh_ketluan: string;
}
@Component({
  selector: 'app-than-kinh1',
  templateUrl: './than-kinh1.component.html',
  styleUrls: ['./than-kinh1.component.css']
})
export class ThanKinh1Component extends CertificateKeyValueComponentBase<ThanKinh1ViewModel>  implements OnInit {
  setViewModel(model: any) {
    for (const key in this.thankinh1) {
      if (Object.prototype.hasOwnProperty.call(this.thankinh1, key)) {
        const item = model.items.find(i => i.key === key);
        if(item){
          this.thankinh1[key] = item.value;
        }
      }
    }
  }
  thankinh1: ThanKinh1ViewModel={
    thankinh_selectbox_phanloai: 'Bình thường',
    thankinh_text_thankinh_ketluan: 'Đủ sức khỏe'
  };
  @Input() Data: any;
  @Input() statusDataCheck: any;
  
  keys = [""];
  isEditable8= false;
  certificateId: string;
  certificateStatus: CertificateGroupStatusDto;
  status = false;
  constructor( private _permissionChecker: PermissionCheckerService,private dataservice: DataService,private injector: Injector, private khoaThanKinhServiceServiceProxy: KhoaThanKinhServiceServiceProxy) {
    super(injector, dataservice)
    this.group = "thankinh";
   }
  
  ngOnInit() {
    super.ngOnInit();
    if(this._permissionChecker.isGranted("Pages.ThanKinh.Create")){
      this.isEditable8 = true;
    }
  }
  save(): void{
    const data  =  {
      keys: {
        "thankinh_selectbox_phanloai": new Values({ value: this.thankinh1.thankinh_selectbox_phanloai }),
        "thankinh_text_thankinh_ketluan": new Values({ value: this.thankinh1.thankinh_text_thankinh_ketluan })
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
      this.khoaThanKinhServiceServiceProxy.updateOrInsert(input).subscribe(
        () => {
          this.notify.info(this.l('SavedSuccessfully.'));
          this.dataservice.refreshData(this.certificateId);
        },
      );
    }else{
      this.khoaThanKinhServiceServiceProxy.createList(input).subscribe(
        () => {
          this.notify.info(this.l('SavedSuccessfully.'));
          this.dataservice.refreshData(this.certificateId);
        },
      );
    }
  }


}
