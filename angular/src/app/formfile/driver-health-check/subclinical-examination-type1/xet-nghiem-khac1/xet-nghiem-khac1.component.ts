import { Component, Injector, Input, OnInit } from '@angular/core';
import { CertificateKeyValueComponentBase } from '@app/manager/base-certificate';
import { DataService } from '@app/services/data.service';
import { AppComponentBase } from '@shared/app-component-base';
import { CertificateGroupStatusDto,  CreateCertificateGroupStatusDto,  KeyValues,  Values,  XetNghiemKhacServiceServiceProxy } from '@shared/service-proxies/service-proxies';
import { PermissionCheckerService } from 'abp-ng2-module';
class XetNghiemKhacViewModel{
  xetnghiemkhac_text_phanloai: string;
  xetnghiemkhac_text_ketqua: string;
  xetnghiemkhac_text_ketluan: string;
}
@Component({
  selector: 'app-xet-nghiem-khac1',
  templateUrl: './xet-nghiem-khac1.component.html',
  styleUrls: ['./xet-nghiem-khac1.component.css']
})
export class XetNghiemKhac1Component extends CertificateKeyValueComponentBase<XetNghiemKhacViewModel>  implements OnInit {
  setViewModel(model: any) {
    let object = Object.fromEntries(new Map(model.items.map(obj=>{
      return [obj.key, obj.value]
    })));
    this.xetnghiemkhac = object as unknown as XetNghiemKhacViewModel;
  }
  xetnghiemkhac: XetNghiemKhacViewModel;
  @Input() statusDataCheck: any;
  @Input() Data: any;
  keys = [""];
  isEditable10= false;
  certificateId: string;
  certificateStatus: CertificateGroupStatusDto;
  status = false;
  constructor( private _permissionChecker: PermissionCheckerService,private dataservice: DataService,private injector: Injector, private xetNghiemKhacServiceServiceProxy: XetNghiemKhacServiceServiceProxy) {
    super(injector, dataservice)
    this.group = "xetnghiemkhac";
   }

   ngOnInit() {
    super.ngOnInit();
    if(this._permissionChecker.isGranted("Pages.XetNghiemKhac.Create")){
      this.isEditable10 = true;
    }

  }
  save(): void{
    const data  =  {
      keys: {
        "xetnghiemkhac_text_ketluan": new Values({ value: this.xetnghiemkhac.xetnghiemkhac_text_ketluan }),
        "xetnghiemkhac_text_ketqua": new Values({ value: this.xetnghiemkhac.xetnghiemkhac_text_ketqua }),
        "xetnghiemkhac_text_phanloai": new Values({ value: this.xetnghiemkhac.xetnghiemkhac_text_phanloai }),
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
      this.xetNghiemKhacServiceServiceProxy.updateOrInsert(input).subscribe(
        () => {
          this.notify.info(this.l('SavedSuccessfully.'));
          this.dataservice.refreshData(this.certificateId);
        },
      );
    }else{
      this.xetNghiemKhacServiceServiceProxy.createList(input).subscribe(
        () => {
          this.notify.info(this.l('SavedSuccessfully.'));
          this.dataservice.refreshData(this.certificateId);
        },
      );
    }
  }

}
