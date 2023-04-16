import { Component, Injector, Input, OnInit } from '@angular/core';
import { CertificateKeyValueComponentBase } from '@app/manager/base-certificate';
import { DataService } from '@app/services/data.service';
import { AppComponentBase } from '@shared/app-component-base';
import { CertificateGroupStatusDto, CreateCertificateGroupStatusDto, KeyValues, KhoaTaiMuiHongServiceServiceProxy, Values } from '@shared/service-proxies/service-proxies';
import { PermissionCheckerService } from 'abp-ng2-module';
interface TaiMuHong1ViewModel {
  taimuihong_text_taitrai:string;
  taimuihong_text_taiphai:string;
  taimuihong_text_taitrai_noitham:string;
  taimuihong_text_taiphai_noitham:string;
  taimuihong_selectbox_phanloai: string;
  taimuihong_text_taimuihong_ketluan: string;
}
@Component({
  selector: 'app-tai-mui-hong1',
  templateUrl: './tai-mui-hong1.component.html',
  styleUrls: ['./tai-mui-hong1.component.css']
})
export class TaiMuiHong1Component  extends CertificateKeyValueComponentBase<TaiMuHong1ViewModel>  implements OnInit {
  setViewModel(model: any) {
    for (const key in this.taimuihong1) {
      if (Object.prototype.hasOwnProperty.call(this.taimuihong1, key)) {
        const item = model.items.find(i => i.key === key);
        if(item){
          this.taimuihong1[key] = item.value;
        }
      }
    }
  }
  taimuihong1: TaiMuHong1ViewModel = {
    taimuihong_text_taitrai: '05',
    taimuihong_text_taiphai: '05',
    taimuihong_text_taitrai_noitham: '',
    taimuihong_text_taiphai_noitham: '',
    taimuihong_selectbox_phanloai: 'Không',
    taimuihong_text_taimuihong_ketluan: 'Đủ sức khỏe'
  };
  @Input() statusDataCheck: any;
  @Input() Data: any;
  keys = [""];
  isEditable5= false;
  certificateId: string;
  certificateStatus: CertificateGroupStatusDto;
  status = false;
  constructor(private _permissionChecker: PermissionCheckerService,private dataservice: DataService,private injector: Injector, private khoaTaiMuiHongServiceServiceProxy: KhoaTaiMuiHongServiceServiceProxy) { 
    super(injector, dataservice)
    this.group = "taimuihong";
   }
  
  ngOnInit() {
    super.ngOnInit();
    if(this._permissionChecker.isGranted("Pages.TaiMuiHong.Create")){
      this.isEditable5 = true;
    }
  }
  save(): void{
    const data  =  {
      keys: {
        "hohap_selectbox_phanloai": new Values({ value: this.taimuihong1.taimuihong_selectbox_phanloai }),
        "hohap_text_hohap_ketluan": new Values({ value: this.taimuihong1.taimuihong_text_taimuihong_ketluan }),
        "taimuihong_text_taiphai": new Values({ value: this.taimuihong1.taimuihong_text_taiphai }),
        "taimuihong_text_taiphai_noitham": new Values({ value: this.taimuihong1.taimuihong_text_taiphai_noitham }),
        "taimuihong_text_taitrai": new Values({ value: this.taimuihong1.taimuihong_text_taitrai }),
        "taimuihong_text_taitrai_noitham": new Values({ value: this.taimuihong1.taimuihong_text_taitrai_noitham }),
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
      this.khoaTaiMuiHongServiceServiceProxy.updateOrInsert(input).subscribe(
        () => {
          this.notify.info(this.l('SavedSuccessfully.'));
          this.dataservice.refreshData(this.certificateId);
        },
      );
    }else{
      this.khoaTaiMuiHongServiceServiceProxy.createList(input).subscribe(
        () => {
          this.notify.info(this.l('SavedSuccessfully.'));
          this.dataservice.refreshData(this.certificateId);
        },
      );
    }
  }


}
