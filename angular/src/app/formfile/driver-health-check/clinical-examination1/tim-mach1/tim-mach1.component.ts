import { Component, Injector, Input, OnInit } from '@angular/core';
import { CertificateKeyValueComponentBase } from '@app/manager/base-certificate';
import { DataService } from '@app/services/data.service';
import { AppComponentBase } from '@shared/app-component-base';
import { CertificateGroupStatusDto, CreateCertificateGroupStatusDto, KeyValues, KhoaTimMachServiceServiceProxy, Values } from '@shared/service-proxies/service-proxies';
import { PermissionCheckerService } from 'abp-ng2-module';
interface TimMach1ViewModel {
  timmach_text_mach: string;
  timmach_text_huyetap: string;
  timmach_selectbox_phanloai: string;
  timmach_text_timmach_ketluan: string;
}
@Component({
  selector: 'app-tim-mach1',
  templateUrl: './tim-mach1.component.html',
  styleUrls: ['./tim-mach1.component.css']
})
export class TimMach1Component  extends CertificateKeyValueComponentBase<TimMach1ViewModel> implements OnInit {
  setViewModel(model: any) {
    for (const key in this.timmach1) {
      if (Object.prototype.hasOwnProperty.call(this.timmach1, key)) {
        const item = model.items.find(i => i.key === key);
        if(item){
          this.timmach1[key] = item.value;
        }
      }
    }
  }
  timmach1: TimMach1ViewModel = {
    timmach_text_mach: '',
    timmach_text_huyetap: '',
    timmach_selectbox_phanloai: 'Bình thường',
    timmach_text_timmach_ketluan: 'Đủ sức khỏe'
  };
  @Input() statusDataCheck: any;
  @Input() Data: any;
  keys = [""];
  isEditable9= false;
  certificateId: string;
  certificateStatus: CertificateGroupStatusDto;
  status = false;
  constructor( private _permissionChecker: PermissionCheckerService,private dataservice: DataService,private injector: Injector, private khoaTimMachServiceServiceProxy: KhoaTimMachServiceServiceProxy) { 
    super(injector, dataservice)
    this.group = "timmach";
   }
  
  ngOnInit() {
    super.ngOnInit();
    if(this._permissionChecker.isGranted("Pages.TimMach.Create")){
      this.isEditable9 = true;
    }
  }
  save(): void{
    const data  =  {
      keys: {
        "timmach_selectbox_phanloai": new Values({ value: this.timmach1.timmach_selectbox_phanloai }),
        "timmach_text_huyetap": new Values({ value: this.timmach1.timmach_text_huyetap }),
        "timmach_text_mach": new Values({ value: this.timmach1.timmach_text_mach }),
        "timmach_text_timmach_ketluan": new Values({ value: this.timmach1.timmach_text_timmach_ketluan }),
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
      this.khoaTimMachServiceServiceProxy.updateOrInsert(input).subscribe(
        () => {
          this.notify.info(this.l('SavedSuccessfully.'));
          this.dataservice.refreshData(this.certificateId);
        },
      );
    }else{
      this.khoaTimMachServiceServiceProxy.createList(input).subscribe(
        () => {
          this.notify.info(this.l('SavedSuccessfully.'));
          this.dataservice.refreshData(this.certificateId);
        },
      );
    }
  }

}
