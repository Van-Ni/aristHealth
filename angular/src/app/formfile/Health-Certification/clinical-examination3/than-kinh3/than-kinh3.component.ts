import { Component, Injector, Input, OnInit } from '@angular/core';
import { CertificateKeyValueComponentBase } from '@app/manager/base-certificate';
import { DataService } from '@app/services/data.service';
import { AppComponentBase } from '@shared/app-component-base';
import { CertificateGroupStatusDto, CreateMedicationKeyResultDto, KhoaThanKinhServiceServiceProxy } from '@shared/service-proxies/service-proxies';
import { PermissionCheckerService } from 'abp-ng2-module';
interface ThanKinh3ViewModel {
  thankinh_selectbox_phanloai: string;
  thankinh_text_thankinh_noidung: string;
}
@Component({
  selector: 'app-than-kinh3',
  templateUrl: './than-kinh3.component.html',
  styleUrls: ['./than-kinh3.component.css']
})
export class ThanKinh3Component extends CertificateKeyValueComponentBase<ThanKinh3ViewModel> implements OnInit {
  setViewModel(model: any) {
    let object = Object.fromEntries(new Map(model.items.map(obj=>{
      return [obj.key, obj.value]
    })));
    this.thankinh3 = object as unknown as ThanKinh3ViewModel;
  }
  thankinh3: ThanKinh3ViewModel;
  @Input() Data: any;
  keys = [""];
  isEditable= false;
  @Input() statusDataCheck: any;
  certificateId: string;
  certificateStatus: CertificateGroupStatusDto;
  status = false;
  notify: any;
  constructor( private _permissionChecker: PermissionCheckerService,private dataservice: DataService,private injector: Injector,private khoaThanKinhServiceServiceProxy: KhoaThanKinhServiceServiceProxy) {
    super(injector, dataservice)
    this.group = "thankinh";
   }

   ngOnInit() {
    super.ngOnInit();
    if(this._permissionChecker.isGranted("Pages.ThanKinh.Create")){
      this.isEditable = true;
    }

  }
  save(): void{
    var inputhohap2s : CreateMedicationKeyResultDto[] = [];
    const item1 = new CreateMedicationKeyResultDto(
      {
        key: 'thankinh_selectbox_phanloai',
        value:  this.thankinh3.thankinh_selectbox_phanloai|| '',
        certificateId: this.certificateId,  
        group: "thankinh",
      }
    );const item2 = new CreateMedicationKeyResultDto(
      {
        key: 'thankinh_text_thankinh_noidung',
        value:  this.thankinh3.thankinh_text_thankinh_noidung|| '',
        certificateId: this.certificateId,
        group: "thankinh",
      }
    );
    inputhohap2s.push(item1);
    inputhohap2s.push(item2);
    if(this.status == true){
      this.khoaThanKinhServiceServiceProxy.updateOrInsert(inputhohap2s).subscribe(
        () => {
          this.notify.info(this.l('SavedSuccessfully.'));
          this.dataservice.refreshData(this.certificateId);
        },
      );
    }else{
      this.khoaThanKinhServiceServiceProxy.createList(inputhohap2s).subscribe(
        () => {
          this.notify.info(this.l('SavedSuccessfully.'));
          this.dataservice.refreshData(this.certificateId);
        },
      );
    }
  }
}
