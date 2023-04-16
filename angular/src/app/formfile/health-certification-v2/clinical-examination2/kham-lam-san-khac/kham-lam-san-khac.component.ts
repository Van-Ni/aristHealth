import { Component, Injector, Input, OnInit } from '@angular/core';
import { DataService } from '@app/services/data.service';
import { AppComponentBase } from '@shared/app-component-base';
import { CertificateGroupStatusDto, KhamLamSanServiceServiceProxy } from '@shared/service-proxies/service-proxies';
import { PermissionCheckerService } from 'abp-ng2-module';
interface KhamLamSanKhac2ViewModel {
  khamlamsan_selectbox_phanloai: string;
  khamlamsan_text_khamlamsan_noidung: string;
}
@Component({
  selector: 'app-kham-lam-san-khac',
  templateUrl: './kham-lam-san-khac.component.html',
  styleUrls: ['./kham-lam-san-khac.component.css']
})
export class KhamLamSanKhacComponent extends AppComponentBase implements OnInit {
  khamlamsan: KhamLamSanKhac2ViewModel;
  @Input() Data: any;
  @Input() statusDataCheck: any;
  keys = [""];
  isEditable2= false;
  certificateId: string;
  certificateStatus: CertificateGroupStatusDto;
  status = false;
  notify: any;
  constructor( private _permissionChecker: PermissionCheckerService,private dataservice: DataService,private injector: Injector,private khoakhamlamsanServiceServiceProxy: KhamLamSanServiceServiceProxy) {
    super(injector);
   }

  ngOnInit() {
    for (const item of this.statusDataCheck.items) {
      if(item.group == "KhamLamSanKhac")
      {
        this.status = true;
      }
    }
    this.certificateId = this.dataservice.getData();
    if(this._permissionChecker.isGranted("Pages.KhamLamSanKhac.Create")){
      this.isEditable2 = true;
    }
    let object = Object.fromEntries(new Map(this.Data.items.map(obj=>{
      return [obj.key, obj.value]
    })));
    this.khamlamsan = object as unknown as KhamLamSanKhac2ViewModel;
  }
  save(): void{
    // var inputkhamlamsan2s : CreateMedicationKeyResultDto[] = [];
    // const item1 = new CreateMedicationKeyResultDto(
    //   {
    //     key: 'khamlamsankhac_selectbox_phanloai',
    //     value:  this.khamlamsan.khamlamsan_selectbox_phanloai|| '',
    //     certificateId: this.certificateId,  
    //     group: "KhamLamSanKhac",
    //   }
    // );const item2 = new CreateMedicationKeyResultDto(
    //   {
    //     key: 'khamlamsankhac_text_khamlamsan_noidung',
    //     value:  this.khamlamsan.khamlamsan_text_khamlamsan_noidung|| '',
    //     certificateId: this.certificateId,
    //     group: "KhamLamSanKhac",
    //   }
    // );
    // inputkhamlamsan2s.push(item1);
    // inputkhamlamsan2s.push(item2);
    // if(this.status == true){
    //   this.khoakhamlamsanServiceServiceProxy.updateOrInsert(inputkhamlamsan2s).subscribe(
    //     () => {
    //       this.notify.info(this.l('SavedSuccessfully.'));
    //     },
    //   );
    // }else{
    //   this.khoakhamlamsanServiceServiceProxy.createList(inputkhamlamsan2s).subscribe(
    //     () => {
    //       this.notify.info(this.l('SavedSuccessfully.'));
    //     },
    //   );
    // }
  }
}
