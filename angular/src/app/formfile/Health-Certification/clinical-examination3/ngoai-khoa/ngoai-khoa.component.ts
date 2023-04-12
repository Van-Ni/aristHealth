import { Component, Injector, Input, OnInit } from '@angular/core';
import { CertificateKeyValueComponentBase } from '@app/manager/base-certificate';
import { DataService } from '@app/services/data.service';
import { AppComponentBase } from '@shared/app-component-base';
import { CertificateGroupStatusDto, CreateMedicationKeyResultDto, KhoaNgoaiKhoaServiceServiceProxy } from '@shared/service-proxies/service-proxies';
import { PermissionCheckerService } from 'abp-ng2-module';
interface NgoaiKhoa1ViewModel {
  ngoaikhoa_selectbox_phanloai: string;
  ngoaikhoa_text_ngoaikhoa_ketluan: string;
}
@Component({
  selector: 'app-ngoai-khoa',
  templateUrl: './ngoai-khoa.component.html',
  styleUrls: ['./ngoai-khoa.component.css']
})
export class NgoaiKhoaComponent extends CertificateKeyValueComponentBase<NgoaiKhoa1ViewModel> implements OnInit {
  setViewModel(model: any) {
    let object = Object.fromEntries(new Map(model.items.map(obj=>{
      return [obj.key, obj.value]
    })));
    this.ngoaikhoa3 = object as unknown as NgoaiKhoa1ViewModel;
  }
  ngoaikhoa3: NgoaiKhoa1ViewModel;
  @Input() Data: any;
  keys = [""];
  isEditable= false;
  @Input() statusDataCheck: any;
  certificateId: string;
  certificateStatus: CertificateGroupStatusDto;
  status = false;
  notify: any;
  constructor( private _permissionChecker: PermissionCheckerService,private dataservice: DataService,private injector: Injector,private KhoaNgoaiKhoaServiceServiceProxy: KhoaNgoaiKhoaServiceServiceProxy) {
    super(injector, dataservice)
    this.group = "ngoaikhoa";
   }

   ngOnInit() {
    super.ngOnInit();
    if(this._permissionChecker.isGranted("Pages.NgoaiKhoa.Create")){
      this.isEditable = true;
    }

  }
  save(): void{
    var inputhohap2s : CreateMedicationKeyResultDto[] = [];
    const item1 = new CreateMedicationKeyResultDto(
      {
        key: 'ngoaikhoa_selectbox_phanloai',
        value:  this.ngoaikhoa3.ngoaikhoa_selectbox_phanloai|| '',
        certificateId: this.certificateId,  
        group: "ngoaikhoa",
      }
    );const item2 = new CreateMedicationKeyResultDto(
      {
        key: 'ngoaikhoa_text_ngoaikhoa_ketluan',
        value:  this.ngoaikhoa3.ngoaikhoa_text_ngoaikhoa_ketluan|| '',
        certificateId: this.certificateId,
        group: "ngoaikhoa",
      }
    );
    inputhohap2s.push(item1);
    inputhohap2s.push(item2);
    if(this.status == true){
      this.KhoaNgoaiKhoaServiceServiceProxy.updateOrInsert(inputhohap2s).subscribe(
        () => {
          this.notify.info(this.l('SavedSuccessfully.'));
          this.dataservice.refreshData(this.certificateId);
        },
      );
    }else{
      this.KhoaNgoaiKhoaServiceServiceProxy.createList(inputhohap2s).subscribe(
        () => {
          this.notify.info(this.l('SavedSuccessfully.'));
          this.dataservice.refreshData(this.certificateId);
        },
      );
    }
  }
}
