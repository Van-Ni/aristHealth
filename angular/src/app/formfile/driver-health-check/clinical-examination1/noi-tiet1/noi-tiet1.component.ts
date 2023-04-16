import { Component, Injector, Input, OnInit } from '@angular/core';
import { CertificateKeyValueComponentBase } from '@app/manager/base-certificate';
import { DataService } from '@app/services/data.service';
import { AppComponentBase } from '@shared/app-component-base';
import { CertificateGroupStatusDto, CreateCertificateGroupStatusDto, KeyValues, KhoaNoiTietServiceServiceProxy, Values } from '@shared/service-proxies/service-proxies';
import { PermissionCheckerService } from 'abp-ng2-module';
interface NoiTiet1ViewModel {
  noitiet_selectbox_phanloai: string;
  noitiet_text_noitiet_ketluan: string;
}
@Component({
  selector: 'app-noi-tiet1',
  templateUrl: './noi-tiet1.component.html',
  styleUrls: ['./noi-tiet1.component.css']
})
export class NoiTiet1Component  extends CertificateKeyValueComponentBase<NoiTiet1ViewModel> implements OnInit {
  setViewModel(model: any) {
    // let object = Object.fromEntries(new Map(model.items.map(obj=>{
    //   return [obj.key, obj.value]})));
    //   this.noitiet1 = object as unknown as NoiTiet1ViewModel;
    for (const key in this.noitiet1) {
      if (Object.prototype.hasOwnProperty.call(this.noitiet1, key)) {
        const item = model.items.find(i => i.key === key);
        if(item){
          this.noitiet1[key] = item.value;
        }
      }
    }
  }
  noitiet1: NoiTiet1ViewModel = {
    noitiet_selectbox_phanloai: 'Bình thường',
    noitiet_text_noitiet_ketluan: 'Đủ sức khỏe'
  };
  @Input() statusDataCheck: any;
  @Input() Data: any;
  keys = [""];
  isEditable4= false;
  certificateId: string;
  certificateStatus: CertificateGroupStatusDto;
  status = false;
  constructor(private _permissionChecker: PermissionCheckerService,private dataservice: DataService,private injector: Injector, private khoaNoiTietServiceServiceProxy: KhoaNoiTietServiceServiceProxy) { 
    super(injector, dataservice)
    this.group = "noitiet";
   }
  
  ngOnInit() {
    super.ngOnInit();
    if(this._permissionChecker.isGranted("Pages.NoiTiet.Create")){
      this.isEditable4 = true;
    }
  }
  save(): void{
    const data  =  {
      keys: {
        "noitiet_selectbox_phanloai": new Values({ value: this.noitiet1.noitiet_selectbox_phanloai }),
        "noitiet_text_noitiet_ketluan": new Values({ value: this.noitiet1.noitiet_text_noitiet_ketluan })
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
      this.khoaNoiTietServiceServiceProxy.updateOrInsert(input).subscribe(
        () => {
          this.notify.info(this.l('SavedSuccessfully.'));
          this.dataservice.refreshData(this.certificateId);
        },
      );
    }else{
      this.khoaNoiTietServiceServiceProxy.createList(input).subscribe(
        () => {
          this.notify.info(this.l('SavedSuccessfully.'));
          this.dataservice.refreshData(this.certificateId);
        },
      );
    }
  }

}
