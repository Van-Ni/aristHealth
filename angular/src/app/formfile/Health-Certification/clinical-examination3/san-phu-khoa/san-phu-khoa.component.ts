import { Component, Injector, Input, OnInit } from '@angular/core';
import { CertificateKeyValueComponentBase } from '@app/manager/base-certificate';
import { DataService } from '@app/services/data.service';
import { AppComponentBase } from '@shared/app-component-base';
import { CertificateGroupStatusDto, CreateMedicationKeyResultDto, KhoaThaiSanServiceServiceProxy } from '@shared/service-proxies/service-proxies';
import { PermissionCheckerService } from 'abp-ng2-module';
interface SanPhuKhoa3ViewModel {
  thaisan_selectbox_phanloai: string;
  thaisan_text_thaisan_noidung: string;
}
@Component({
  selector: 'app-san-phu-khoa',
  templateUrl: './san-phu-khoa.component.html',
  styleUrls: ['./san-phu-khoa.component.css']
})
export class SanPhuKhoaComponent extends CertificateKeyValueComponentBase<SanPhuKhoa3ViewModel> implements OnInit {
  setViewModel(model: any) {
    let object = Object.fromEntries(new Map(model.items.map(obj=>{
      return [obj.key, obj.value]
    })));
    this.sanphukhoa3 = object as unknown as SanPhuKhoa3ViewModel;
  }
  sanphukhoa3: SanPhuKhoa3ViewModel;
  @Input() Data: any;
  keys = [""];
  isEditable= false;
  @Input() statusDataCheck: any;
  certificateId: string;
  certificateStatus: CertificateGroupStatusDto;
  status = false;
  notify: any;
  constructor( private _permissionChecker: PermissionCheckerService,private dataservice: DataService,private injector: Injector,private KhoaThaiSanServiceServiceProxy: KhoaThaiSanServiceServiceProxy) {
    super(injector, dataservice)
    this.group = "thaisan";
   }

   ngOnInit() {
    super.ngOnInit();
    if(this._permissionChecker.isGranted("Pages.ThaiSan.Create")){
      this.isEditable = true;
    }

  }
  save(): void{
    var inputhohap2s : CreateMedicationKeyResultDto[] = [];
    const item1 = new CreateMedicationKeyResultDto(
      {
        key: 'thaisan_text_thaisan_noidung',
        value:  this.sanphukhoa3.thaisan_text_thaisan_noidung|| '',
        certificateId: this.certificateId,  
        group: "thaisan",
      }
    );const item2 = new CreateMedicationKeyResultDto(
      {
        key: 'thaisan_selectbox_phanloai',
        value:  this.sanphukhoa3.thaisan_selectbox_phanloai|| '',
        certificateId: this.certificateId,
        group: "thaisan",
      }
    );
    inputhohap2s.push(item1);
    inputhohap2s.push(item2);
    if(this.status == true){
      this.KhoaThaiSanServiceServiceProxy.updateOrInsert(inputhohap2s).subscribe(
        () => {
          this.notify.info(this.l('SavedSuccessfully.'));
          this.dataservice.refreshData(this.certificateId);
        },
      );
    }else{
      this.KhoaThaiSanServiceServiceProxy.createList(inputhohap2s).subscribe(
        () => {
          this.notify.info(this.l('SavedSuccessfully.'));
          this.dataservice.refreshData(this.certificateId);
        },
      );
    }
  }
}
