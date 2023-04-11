import { Component, Injector, Input, OnInit } from '@angular/core';
import { DataService } from '@app/services/data.service';
import { AppComponentBase } from '@shared/app-component-base';
import { CertificateGroupStatusDto, CreateMedicationKeyResultDto, KhoaTaiMuiHongServiceServiceProxy } from '@shared/service-proxies/service-proxies';
import { PermissionCheckerService } from 'abp-ng2-module';
interface TaiMuHong1ViewModel {
  taimuihong_text_taitrai:string;
  taimuihong_text_taiphai:string;
  taimuihong_text_taitrai_noitham:string;
  taimuihong_text_taiphai_noitham:string;
  taimuihong_text_noidung: string;
  taimuihong_selectbox_phanloai: string;
  taimuihong_text_taimuihong_ketluan: string;
}
@Component({
  selector: 'app-tai-mui-hong1',
  templateUrl: './tai-mui-hong1.component.html',
  styleUrls: ['./tai-mui-hong1.component.css']
})
export class TaiMuiHong1Component  extends AppComponentBase  implements OnInit {
  taimuihong1: TaiMuHong1ViewModel;
  @Input() statusDataCheck: any;
  @Input() Data: any;
  keys = [""];
  isEditable5= false;
  certificateId: string;
  certificateStatus: CertificateGroupStatusDto;
  status = false;
  constructor(private _permissionChecker: PermissionCheckerService,private dataservice: DataService,private injector: Injector, private khoaTaiMuiHongServiceServiceProxy: KhoaTaiMuiHongServiceServiceProxy) { 
    super(injector)
  }

  ngOnInit() {
    for (const item of this.statusDataCheck.items) {
      if(item.group == "TaiMuiHong")
      {
        this.status = true;
      }
    }
    this.certificateId = this.dataservice.getData();
    if(this._permissionChecker.isGranted("Pages.TaiMuiHong.Create")){
      this.isEditable5 = true;
    }
    let object = Object.fromEntries(new Map(this.Data.items.map(obj=>{
      return [obj.key, obj.value]
    })));
    this.taimuihong1 = object as unknown as TaiMuHong1ViewModel;
  }
  save(): void{
    var inputtaimuihong1s : CreateMedicationKeyResultDto[] = [];
    const item1 = new CreateMedicationKeyResultDto(
      {
        key: 'taimuihong_selectbox_phanloai',
        value:  this.taimuihong1.taimuihong_selectbox_phanloai|| '',
        certificateId: this.certificateId,  
        group: "TaiMuiHong",
      }
    );const item2 = new CreateMedicationKeyResultDto(
      {
        key: 'taimuihong_text_noidung',
        value:  this.taimuihong1.taimuihong_text_noidung|| '',
        certificateId: this.certificateId,
        group: "TaiMuiHong",
      }
    );const item3 = new CreateMedicationKeyResultDto(
      {
        key: 'taimuihong_text_taimuihong_ketluan',
        value:  this.taimuihong1.taimuihong_text_taimuihong_ketluan|| '',
        certificateId: this.certificateId,
        group: "TaiMuiHong",
      }
    );const item4 = new CreateMedicationKeyResultDto(
      {
        key: 'taimuihong_text_taiphai',
        value:  this.taimuihong1.taimuihong_text_taiphai|| '',
        certificateId: this.certificateId,
        group: "TaiMuiHong",
      }
    );const item5 = new CreateMedicationKeyResultDto(
      {
        key: 'taimuihong_text_taiphai_noitham',
        value:  this.taimuihong1.taimuihong_text_taiphai_noitham|| '',
        certificateId: this.certificateId,
        group: "TaiMuiHong",
      }
    );const item6 = new CreateMedicationKeyResultDto(
      {
        key: 'taimuihong_text_taitrai',
        value:  this.taimuihong1.taimuihong_text_taitrai|| '',
        certificateId: this.certificateId,
        group: "TaiMuiHong",
      }
    );const item7 = new CreateMedicationKeyResultDto(
      {
        key: 'taimuihong_text_taitrai_noitham',
        value:  this.taimuihong1.taimuihong_text_taitrai_noitham|| '',
        certificateId: this.certificateId,
        group: "TaiMuiHong",
      }
    );
    inputtaimuihong1s.push(item1);
    inputtaimuihong1s.push(item2);
    inputtaimuihong1s.push(item3);
    inputtaimuihong1s.push(item4);
    inputtaimuihong1s.push(item5);
    inputtaimuihong1s.push(item6);
    inputtaimuihong1s.push(item7);
    if(this.status == true){
      this.khoaTaiMuiHongServiceServiceProxy.updateOrInsert(inputtaimuihong1s).subscribe(
        () => {
          this.notify.info(this.l('SavedSuccessfully.'));
        },
      );
    }else{
      this.khoaTaiMuiHongServiceServiceProxy.createList(inputtaimuihong1s).subscribe(
        () => {
          this.notify.info(this.l('SavedSuccessfully.'));
        },
      );
    }
  }


}
