import { Component, Injector, Input, OnInit } from '@angular/core';
import { CertificateKeyValueComponentBase } from '@app/manager/base-certificate';
import { DataService } from '@app/services/data.service';
import { AppComponentBase } from '@shared/app-component-base';
import { CertificateGroupStatusDto, CreateMedicationKeyResultDto, KhoaThanKinhServiceServiceProxy } from '@shared/service-proxies/service-proxies';
import { PermissionCheckerService } from 'abp-ng2-module';
interface ThanKinh1ViewModel {
  thankinh_text_noidung: string;
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
    let object = Object.fromEntries(new Map(model.items.map(obj=>{
      return [obj.key, obj.value]
    })));
    this.thankinh1 = object as unknown as ThanKinh1ViewModel;
  }
  thankinh1: ThanKinh1ViewModel;
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
    if(this.status == false)
    {
    this.thankinh1.thankinh_selectbox_phanloai = "Bình thường";
    this.thankinh1.thankinh_text_thankinh_ketluan = "Đủ sức khỏe";
    }
  }
  save(): void{
    var inputthankinh1s : CreateMedicationKeyResultDto[] = [];
    const item1 = new CreateMedicationKeyResultDto(
      {
        key: 'thankinh_selectbox_phanloai',
        value:  this.thankinh1.thankinh_selectbox_phanloai|| '',
        certificateId: this.certificateId,  
        group: this.group,
      }
    );const item2 = new CreateMedicationKeyResultDto(
      {
        key: 'thankinh_text_thankinh_ketluan',
        value:  this.thankinh1.thankinh_text_thankinh_ketluan|| '',
        certificateId: this.certificateId,
        group: this.group,
      }
    );
    inputthankinh1s.push(item1);
    inputthankinh1s.push(item2);
    if(this.status == true){
      this.khoaThanKinhServiceServiceProxy.updateOrInsert(inputthankinh1s).subscribe(
        () => {
          this.notify.info(this.l('SavedSuccessfully.'));
          this.dataservice.refreshData(this.certificateId);
        },
      );
    }else{
      this.khoaThanKinhServiceServiceProxy.createList(inputthankinh1s).subscribe(
        () => {
          this.notify.info(this.l('SavedSuccessfully.'));
          this.dataservice.refreshData(this.certificateId);
        },
      );
    }
  }


}
