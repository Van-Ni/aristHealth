import { Component, Injector, Input, OnInit } from '@angular/core';
import { CertificateKeyValueComponentBase } from '@app/manager/base-certificate';
import { DataService } from '@app/services/data.service';
import { AppComponentBase } from '@shared/app-component-base';
import { CertificateGroupStatusDto, KhoaTaiMuiHongServiceServiceProxy } from '@shared/service-proxies/service-proxies';
import { PermissionCheckerService } from 'abp-ng2-module';
interface TaiMuHong3ViewModel {
  taimuihong_text_taitrai:string;
  taimuihong_text_taiphai:string;
  taimuihong_text_taitrai_noitham:string;
  taimuihong_text_taiphai_noitham:string;
  taimuihong_text_noidung: string;
  taimuihong_selectbox_phanloai: string;
}
@Component({
  selector: 'app-tai-mui-hong3',
  templateUrl: './tai-mui-hong3.component.html',
  styleUrls: ['./tai-mui-hong3.component.css']
})
export class TaiMuiHong3Component extends CertificateKeyValueComponentBase<TaiMuHong3ViewModel>  implements OnInit {
  setViewModel(model: any) {
    let object = Object.fromEntries(new Map(model.items.map(obj=>{
      return [obj.key, obj.value]
    })));
    this.taimuihong3 = object as unknown as TaiMuHong3ViewModel;
  }
  taimuihong3: TaiMuHong3ViewModel;
  @Input() statusDataCheck: any;
  @Input() Data: any;
  keys = [""];
  isEditable5= false;
  certificateId: string;
  certificateStatus: CertificateGroupStatusDto;
  status = false;
  constructor(private _permissionChecker: PermissionCheckerService,private dataservice: DataService,private injector: Injector, private khoaTaiMuiHongServiceServiceProxy: KhoaTaiMuiHongServiceServiceProxy) { 
    super(injector, dataservice)
    this.group = "taimuihong";
   }

   ngOnInit() {
    super.ngOnInit();
    if(this._permissionChecker.isGranted("Pages.TaiMuiHong.Create")){
      this.isEditable5 = true;
    }

  }
  save(): void{
    // var inputtaimuihong3s : CreateMedicationKeyResultDto[] = [];
    // const item1 = new CreateMedicationKeyResultDto(
    //   {
    //     key: 'taimuihong_selectbox_phanloai',
    //     value:  this.taimuihong3.taimuihong_selectbox_phanloai|| '',
    //     certificateId: this.certificateId,  
    //     group: "taimuihong",
    //   }
    // );const item2 = new CreateMedicationKeyResultDto(
    //   {
    //     key: 'taimuihong_text_noidung',
    //     value:  this.taimuihong3.taimuihong_text_noidung|| '',
    //     certificateId: this.certificateId,
    //     group: "taimuihong",
    //   }
    // );const item4 = new CreateMedicationKeyResultDto(
    //   {
    //     key: 'taimuihong_text_taiphai',
    //     value:  this.taimuihong3.taimuihong_text_taiphai|| '',
    //     certificateId: this.certificateId,
    //     group: "taimuihong",
    //   }
    // );const item5 = new CreateMedicationKeyResultDto(
    //   {
    //     key: 'taimuihong_text_taiphai_noitham',
    //     value:  this.taimuihong3.taimuihong_text_taiphai_noitham|| '',
    //     certificateId: this.certificateId,
    //     group: "taimuihong",
    //   }
    // );const item6 = new CreateMedicationKeyResultDto(
    //   {
    //     key: 'taimuihong_text_taitrai',
    //     value:  this.taimuihong3.taimuihong_text_taitrai|| '',
    //     certificateId: this.certificateId,
    //     group: "taimuihong",
    //   }
    // );const item7 = new CreateMedicationKeyResultDto(
    //   {
    //     key: 'taimuihong_text_taitrai_noitham',
    //     value:  this.taimuihong3.taimuihong_text_taitrai_noitham|| '',
    //     certificateId: this.certificateId,
    //     group: "taimuihong",
    //   }
    // );
    // inputtaimuihong3s.push(item1);
    // inputtaimuihong3s.push(item2);
    // inputtaimuihong3s.push(item4);
    // inputtaimuihong3s.push(item5);
    // inputtaimuihong3s.push(item6);
    // inputtaimuihong3s.push(item7);
    // if(this.status == true){
    //   this.khoaTaiMuiHongServiceServiceProxy.updateOrInsert(inputtaimuihong3s).subscribe(
    //     () => {
    //       this.notify.info(this.l('SavedSuccessfully.'));
    //       this.dataservice.refreshData(this.certificateId);
    //     },
    //   );
    // }else{
    //   this.khoaTaiMuiHongServiceServiceProxy.createList(inputtaimuihong3s).subscribe(
    //     () => {
    //       this.notify.info(this.l('SavedSuccessfully.'));
    //       this.dataservice.refreshData(this.certificateId);
    //     },
    //   );
    // }
  }


}
