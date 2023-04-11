import { Component, Injector, Input, OnInit } from '@angular/core';
import { DataService } from '@app/services/data.service';
import { AppComponentBase } from '@shared/app-component-base';
import { CertificateGroupStatusDto, CreateMedicationKeyResultDto, KhoaThaiSanServiceServiceProxy } from '@shared/service-proxies/service-proxies';
import { PermissionCheckerService } from 'abp-ng2-module';
interface ThaiSan1ViewModel {
  thaisan_text_noidung: string;
  thaisan_selectbox_phanloai: string;
  thaisan_text_thaisan_ketluan: string;
}
@Component({
  selector: 'app-thai-san1',
  templateUrl: './thai-san1.component.html',
  styleUrls: ['./thai-san1.component.css']
})
export class ThaiSan1Component extends AppComponentBase implements OnInit {
  thaisan1: ThaiSan1ViewModel;
  @Input() statusDataCheck: any;
  @Input() Data: any;
  keys = [""];
  isEditable7= false;
  certificateId: string;
  certificateStatus: CertificateGroupStatusDto;
  status = false;
  constructor(private _permissionChecker: PermissionCheckerService,private dataservice: DataService,private injector: Injector, private khoaThaiSanServiceServiceProxy: KhoaThaiSanServiceServiceProxy) { 
    super(injector)
  }

  ngOnInit() {
    for (const item of this.statusDataCheck.items) {
      if(item.group == "ThaiSan")
      {
        this.status = true;
      }
    }
    this.certificateId = this.dataservice.getData();
    if(this._permissionChecker.isGranted("Pages.ThaiSan.Create")){
      this.isEditable7 = true;
    }
    let object = Object.fromEntries(new Map(this.Data.items.map(obj=>{
      return [obj.key, obj.value]
    })));
    this.thaisan1 = object as unknown as ThaiSan1ViewModel;
  }
  save(): void{
    var inputthaisan1s : CreateMedicationKeyResultDto[] = [];
    const item1 = new CreateMedicationKeyResultDto(
      {
        key: 'thaisan_selectbox_phanloai',
        value:  this.thaisan1.thaisan_selectbox_phanloai|| '',
        certificateId: this.certificateId,  
        group: "ThaiSan",
      }
    );const item2 = new CreateMedicationKeyResultDto(
      {
        key: 'thaisan_text_thaisan_ketluan',
        value:  this.thaisan1.thaisan_text_thaisan_ketluan|| '',
        certificateId: this.certificateId,
        group: "ThaiSan",
      }
    );
    inputthaisan1s.push(item1);
    inputthaisan1s.push(item2);
    if(this.status == true){
      this.khoaThaiSanServiceServiceProxy.updateOrInsert(inputthaisan1s).subscribe(
        () => {
          this.notify.info(this.l('SavedSuccessfully.'));
        },
      );
    }else{
      this.khoaThaiSanServiceServiceProxy.createList(inputthaisan1s).subscribe(
        () => {
          this.notify.info(this.l('SavedSuccessfully.'));
        },
      );
    }
  }


}
