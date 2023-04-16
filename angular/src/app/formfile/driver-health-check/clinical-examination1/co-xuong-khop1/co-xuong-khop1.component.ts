import { Component, Injector, Input, OnInit } from '@angular/core';
import { CertificateKeyValueComponentBase } from '@app/manager/base-certificate';
import { DataService } from '@app/services/data.service';
import { AppComponentBase } from '@shared/app-component-base';
import { Values } from '@shared/service-proxies/service-proxies';
import { CertificateGroupStatusDto, CertificateGroupStatusDtoPagedResultDto, CreateCertificateGroupStatusDto, KeyValues, KhoaCoXuongKhopServiceServiceProxy } from '@shared/service-proxies/service-proxies';
import { PermissionCheckerService } from 'abp-ng2-module';
import { startWith } from 'rxjs';
interface CoXuongKhop1ViewModel {
  coxuongkhop_selectbox_phanloai: string ;
  coxuongkhop_text_coxuongkhop_ketluan: string ;
}
@Component({
  selector: 'app-co-xuong-khop1',
  templateUrl: './co-xuong-khop1.component.html',
  styleUrls: ['./co-xuong-khop1.component.css']
})
export class CoXuongKhop1Component  extends CertificateKeyValueComponentBase<CoXuongKhop1ViewModel>  implements OnInit {
  setViewModel(model: any) {
    // let object = Object.fromEntries(new Map(model.items.map(obj=>{
    //   return [obj.key, obj.value]})));
    //   this.coxuongkhop1 = object as unknown as CoXuongKhop1ViewModel;
    for (const key in this.coxuongkhop1) {
      if (Object.prototype.hasOwnProperty.call(this.coxuongkhop1, key)) {
        const item = model.items.find(i => i.key === key);
        if(item){
          this.coxuongkhop1[key] = item.value;
        }
      }
    }
  }
  coxuongkhop1: CoXuongKhop1ViewModel = {
    coxuongkhop_selectbox_phanloai :"Bình thường",
    coxuongkhop_text_coxuongkhop_ketluan : "Đủ sức khỏe",
  };
  @Input() Data: any;
  @Input() statusDataCheck: any;
  keys = [""];
  isEditable1= false;
  certificateId: string;
  certificateStatus: CertificateGroupStatusDto;
  status = false;
  data: CertificateGroupStatusDtoPagedResultDto;
  constructor(private _permissionChecker: PermissionCheckerService,private dataservice: DataService,private injector: Injector, private khoaCoXuongKhopServiceServiceProxy: KhoaCoXuongKhopServiceServiceProxy) {
    super(injector, dataservice)
    this.group = "coxuongkhop";
   }

   ngOnInit() {
    super.ngOnInit();
    if(this._permissionChecker.isGranted("Pages.CoXuongKhop.Create")){
      this.isEditable1 = true;
    }
  }
  save(): void{
    const data  =  {
      keys: {
        "coxuongkhop_selectbox_phanloai": new Values({ value: this.coxuongkhop1.coxuongkhop_selectbox_phanloai }),
        "coxuongkhop_text_coxuongkhop_ketluan": new Values({ value: this.coxuongkhop1.coxuongkhop_text_coxuongkhop_ketluan })
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
      this.khoaCoXuongKhopServiceServiceProxy.updateOrInsert(input).subscribe(
        () => {
          this.notify.info(this.l('SavedSuccessfully.'));
          this.dataservice.refreshData(this.certificateId);
        },
      );
    }else{
      this.khoaCoXuongKhopServiceServiceProxy.createList(input).subscribe(
        () => {
          this.notify.info(this.l('SavedSuccessfully.'));
          this.dataservice.refreshData(this.certificateId);
        },
      );
    }
  }
}
