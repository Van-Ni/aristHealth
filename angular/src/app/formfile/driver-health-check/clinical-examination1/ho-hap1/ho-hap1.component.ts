import { Component, Injector, Input, OnInit } from '@angular/core';
import { CertificateKeyValueComponentBase } from '@app/manager/base-certificate';
import { DataService } from '@app/services/data.service';
import { AppComponentBase } from '@shared/app-component-base';
import { CertificateGroupStatusDto, CreateCertificateGroupStatusDto, KeyValues, KhoaHoHapServiceServiceProxy, Values } from '@shared/service-proxies/service-proxies';
import { PermissionCheckerService } from 'abp-ng2-module';
interface HoHap1ViewModel {
  hohap_selectbox_phanloai: string;
  hohap_text_hohap_ketluan: string;
}
@Component({
  selector: 'app-ho-hap1',
  templateUrl: './ho-hap1.component.html',
  styleUrls: ['./ho-hap1.component.css']
})
export class HoHap1Component extends CertificateKeyValueComponentBase<HoHap1ViewModel> implements OnInit {
  setViewModel(model: any) {
    // let object = Object.fromEntries(new Map(model.items.map(obj=>{
    //   return [obj.key, obj.value]})));
    //   this.hohap1 = object as unknown as HoHap1ViewModel;
    for (const key in this.hohap1) {
      if (Object.prototype.hasOwnProperty.call(this.hohap1, key)) {
        const item = model.items.find(i => i.key === key);
        if(item){
          this.hohap1[key] = item.value;
        }
      }
    }
  }
  hohap1: HoHap1ViewModel ={
    hohap_selectbox_phanloai: "Bình thường",
    hohap_text_hohap_ketluan: "Đủ sức khỏe",
  };
  @Input() Data: any;
  @Input() statusDataCheck: any;
  keys = [""];
  isEditable2= false;
  certificateId: string;
  certificateStatus: CertificateGroupStatusDto;
  status = false;
  constructor( private _permissionChecker: PermissionCheckerService,private dataservice: DataService,private injector: Injector,private khoaHoHapServiceServiceProxy: KhoaHoHapServiceServiceProxy) {
    super(injector, dataservice)
    this.group = "hohap";
   }
  

  ngOnInit() {
    super.ngOnInit();
    if(this._permissionChecker.isGranted("Pages.HoHap.Create")){
      this.isEditable2 = true;
    }
    if(this.status == false)
    {
    
    
    }
  }
  save(): void{
    const data  =  {
      keys: {
        "hohap_selectbox_phanloai": new Values({ value: this.hohap1.hohap_selectbox_phanloai }),
        "hohap_text_hohap_ketluan": new Values({ value: this.hohap1.hohap_text_hohap_ketluan })
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
      this.khoaHoHapServiceServiceProxy.updateOrInsert(input).subscribe(
        () => {
          this.notify.info(this.l('SavedSuccessfully.'));
          this.dataservice.refreshData(this.certificateId);
        },
      );
    }else{
      this.khoaHoHapServiceServiceProxy.createList(input).subscribe(
        () => {
          this.notify.info(this.l('SavedSuccessfully.'));
          this.dataservice.refreshData(this.certificateId);
        },
      );
    }
  }
}
