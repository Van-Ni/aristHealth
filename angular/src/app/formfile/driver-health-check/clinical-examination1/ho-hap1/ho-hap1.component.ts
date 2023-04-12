import { Component, Injector, Input, OnInit } from '@angular/core';
import { CertificateKeyValueComponentBase } from '@app/manager/base-certificate';
import { DataService } from '@app/services/data.service';
import { AppComponentBase } from '@shared/app-component-base';
import { CertificateGroupStatusDto, CreateMedicationKeyResultDto, KhoaHoHapServiceServiceProxy } from '@shared/service-proxies/service-proxies';
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
    let object = Object.fromEntries(new Map(model.items.map(obj=>{
      return [obj.key, obj.value]})));
      this.hohap1 = object as unknown as HoHap1ViewModel;
  }
  hohap1: HoHap1ViewModel;
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
  }
  save(): void{
    var inputhohap1s : CreateMedicationKeyResultDto[] = [];
    const item1 = new CreateMedicationKeyResultDto(
      {
        key: 'hohap_selectbox_phanloai',
        value:  this.hohap1.hohap_selectbox_phanloai|| '',
        certificateId: this.certificateId,  
        group: this.group,
      }
    );const item2 = new CreateMedicationKeyResultDto(
      {
        key: 'hohap_text_hohap_ketluan',
        value:  this.hohap1.hohap_text_hohap_ketluan|| '',
        certificateId: this.certificateId,
        group: this.group,
      }
    );
    inputhohap1s.push(item1);
    inputhohap1s.push(item2);
    if(this.status == true){
      this.khoaHoHapServiceServiceProxy.updateOrInsert(inputhohap1s).subscribe(
        () => {
          this.notify.info(this.l('SavedSuccessfully.'));
          this.dataservice.refreshData(this.certificateId);
        },
      );
    }else{
      this.khoaHoHapServiceServiceProxy.createList(inputhohap1s).subscribe(
        () => {
          this.notify.info(this.l('SavedSuccessfully.'));
          this.dataservice.refreshData(this.certificateId);
        },
      );
    }
  }
}
