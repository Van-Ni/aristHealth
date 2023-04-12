import { Component, Injector, Input, OnInit } from '@angular/core';
import { DataService } from '@app/services/data.service';
import { AppComponentBase } from '@shared/app-component-base';
import { CertificateGroupStatusDto, CreateMedicationKeyResultDto, KhoaHoHapServiceServiceProxy } from '@shared/service-proxies/service-proxies';
import { PermissionCheckerService } from 'abp-ng2-module';
interface hohap3ViewModel {
  hohap_selectbox_phanloai: string;
  hohap_text_hohap_noidung: string;
}
@Component({
  selector: 'app-ho-hap3',
  templateUrl: './ho-hap3.component.html',
  styleUrls: ['./ho-hap3.component.css']
})
export class HoHap3Component extends AppComponentBase implements OnInit {
  hohap3: hohap3ViewModel;
  @Input() Data: any;
  keys = [""];
  isEditable= false;
  @Input() statusDataCheck: any;
  certificateId: string;
  certificateStatus: CertificateGroupStatusDto;
  status = false;
  notify: any;
  constructor( private _permissionChecker: PermissionCheckerService,private dataservice: DataService,private injector: Injector,private KhoaHoHapServiceServiceProxy: KhoaHoHapServiceServiceProxy) {
    super(injector);
   }

  ngOnInit() {
    for (const item of this.statusDataCheck.items) {
      if(item.group == "HoHap")
      {
        this.status = true;
      }
    }
    this.certificateId = this.dataservice.getData();
    if(this._permissionChecker.isGranted("Pages.HoHap.Create")){
      this.isEditable = true;
    }
    let object = Object.fromEntries(new Map(this.Data.items.map(obj=>{
      return [obj.key, obj.value]
    })));
    this.hohap3 = object as unknown as hohap3ViewModel;
  }
  save(): void{
    var inputhohap2s : CreateMedicationKeyResultDto[] = [];
    const item1 = new CreateMedicationKeyResultDto(
      {
        key: 'hohap_selectbox_phanloai',
        value:  this.hohap3.hohap_selectbox_phanloai|| '',
        certificateId: this.certificateId,  
        group: "HoHap",
      }
    );const item2 = new CreateMedicationKeyResultDto(
      {
        key: 'hohap_text_hohap_noidung',
        value:  this.hohap3.hohap_text_hohap_noidung|| '',
        certificateId: this.certificateId,
        group: "HoHap",
      }
    );
    inputhohap2s.push(item1);
    inputhohap2s.push(item2);
    if(this.status == true){
      this.KhoaHoHapServiceServiceProxy.updateOrInsert(inputhohap2s).subscribe(
        () => {
          this.notify.info(this.l('SavedSuccessfully.'));
        },
      );
    }else{
      this.KhoaHoHapServiceServiceProxy.createList(inputhohap2s).subscribe(
        () => {
          this.notify.info(this.l('SavedSuccessfully.'));
        },
      );
    }
  }
}
