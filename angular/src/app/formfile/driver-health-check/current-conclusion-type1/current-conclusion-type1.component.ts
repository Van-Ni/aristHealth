import { Component, Injector, Input, OnInit } from '@angular/core';
import { CertificateKeyValueComponentBase } from '@app/manager/base-certificate';
import { DataService } from '@app/services/data.service';
import { AppComponentBase } from '@shared/app-component-base';
import { CertificateGroupStatusDto, CreateCertificateGroupStatusDto,  KetLuanServiceServiceProxy, KeyValues, Values } from '@shared/service-proxies/service-proxies';
import { PermissionCheckerService } from 'abp-ng2-module';
class KetLuan1ViewModel{
  ketluan_text_phanloai: string;
}
@Component({
  selector: 'app-current-conclusion-type1',
  templateUrl: './current-conclusion-type1.component.html',
  styleUrls: ['./current-conclusion-type1.component.css']
})
export class CurrentConclusionType1Component extends CertificateKeyValueComponentBase<KetLuan1ViewModel>  implements OnInit {
  setViewModel(model: any) {
    for (const key in this.ketluan1) {
      if (Object.prototype.hasOwnProperty.call(this.ketluan1, key)) {
        const item = model.items.find(i => i.key === key);
        if(item){
          this.ketluan1[key] = item.value;
        }
      }
    }
  }
  ketluan1: KetLuan1ViewModel ={
    ketluan_text_phanloai: 'Đủ điều kiện lái xe hạng: '
  };
  @Input() statusDataCheck: any;
  @Input() Data: any;
  keys = [""];
  isEditable10= false;
  certificateId: string;
  certificateStatus: CertificateGroupStatusDto;
  status = false;
  constructor( private _permissionChecker: PermissionCheckerService,private dataservice: DataService,private injector: Injector, private KetLuanServiceServiceProxy: KetLuanServiceServiceProxy) {
    super(injector, dataservice)
    this.group = "ketluan";
   }

   ngOnInit() {
    super.ngOnInit();
    
    if(this._permissionChecker.isGranted("Pages.KetLuan.Create")){
      this.isEditable10 = true;
    }

  }
  save(): void{
    const data  =  {
      keys: {
        "ketluan_text_phanloai": new Values({ value: this.ketluan1.ketluan_text_phanloai }),
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
      this.KetLuanServiceServiceProxy.updateOrInsert(input).subscribe(
        () => {
          this.notify.info(this.l('SavedSuccessfully.'));
          this.dataservice.refreshData(this.certificateId);

        },
      );
    }else{
      this.KetLuanServiceServiceProxy.createList(input).subscribe(
        () => {
          this.notify.info(this.l('SavedSuccessfully.'));
          this.dataservice.refreshData(this.certificateId);
        },
      );
    }
  }

}

