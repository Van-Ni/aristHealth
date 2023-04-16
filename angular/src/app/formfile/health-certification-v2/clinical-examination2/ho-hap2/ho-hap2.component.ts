import { Component, Injector, Input, OnInit } from '@angular/core';
import { DataService } from '@app/services/data.service';
import { AppComponentBase } from '@shared/app-component-base';
import { CertificateGroupStatusDto, KhoaHoHapServiceServiceProxy } from '@shared/service-proxies/service-proxies';
import { PermissionCheckerService } from 'abp-ng2-module';
interface HoHap2ViewModel {
  hohap_selectbox_phanloai: string;
  hohap_text_hohap_noidung: string;
}
@Component({
  selector: 'app-ho-hap2',
  templateUrl: './ho-hap2.component.html',
  styleUrls: ['./ho-hap2.component.css']
})
export class HoHap2Component extends AppComponentBase implements OnInit {
  hohap2: HoHap2ViewModel;
  @Input() Data: any;
  @Input() statusDataCheck: any;
  keys = [""];
  isEditable2= false;
  certificateId: string;
  certificateStatus: CertificateGroupStatusDto;
  status = false;
  notify: any;
  constructor( private _permissionChecker: PermissionCheckerService,private dataservice: DataService,private injector: Injector,private khoaHoHapServiceServiceProxy: KhoaHoHapServiceServiceProxy) {
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
      this.isEditable2 = true;
    }
    let object = Object.fromEntries(new Map(this.Data.items.map(obj=>{
      return [obj.key, obj.value]
    })));
    this.hohap2 = object as unknown as HoHap2ViewModel;
  }
  save(): void{
    // var inputhohap2s : CreateMedicationKeyResultDto[] = [];
    // const item1 = new CreateMedicationKeyResultDto(
    //   {
    //     key: 'hohap_selectbox_phanloai',
    //     value:  this.hohap2.hohap_selectbox_phanloai|| '',
    //     certificateId: this.certificateId,  
    //     group: "HoHap",
    //   }
    // );const item2 = new CreateMedicationKeyResultDto(
    //   {
    //     key: 'hohap_text_hohap_noidung',
    //     value:  this.hohap2.hohap_text_hohap_noidung|| '',
    //     certificateId: this.certificateId,
    //     group: "HoHap",
    //   }
    // );
    // inputhohap2s.push(item1);
    // inputhohap2s.push(item2);
    // if(this.status == true){
    //   this.khoaHoHapServiceServiceProxy.updateOrInsert(inputhohap2s).subscribe(
    //     () => {
    //       this.notify.info(this.l('SavedSuccessfully.'));
    //     },
    //   );
    // }else{
    //   this.khoaHoHapServiceServiceProxy.createList(inputhohap2s).subscribe(
    //     () => {
    //       this.notify.info(this.l('SavedSuccessfully.'));
    //     },
    //   );
    // }
  }
}
