import { Component, Injector, Input, OnInit } from '@angular/core';
import { DataService } from '@app/services/data.service';
import { AppComponentBase } from '@shared/app-component-base';
import { CertificateGroupStatusDto, CreateMedicationKeyResultDto, XetNghiemKhacServiceServiceProxy } from '@shared/service-proxies/service-proxies';
import { PermissionCheckerService } from 'abp-ng2-module';
class XetNghiemKhacViewModel{
  xetnghiemkhac_text_phanloai: string;
  xetnghiemkhac_text_ketqua: string;
  xetnghiemkhac_text_ketluan: string;
}
@Component({
  selector: 'app-xet-nghiem-khac1',
  templateUrl: './xet-nghiem-khac1.component.html',
  styleUrls: ['./xet-nghiem-khac1.component.css']
})
export class XetNghiemKhac1Component extends AppComponentBase  implements OnInit {
  xetnghiemkhac: XetNghiemKhacViewModel;
  @Input() statusDataCheck: any;
  @Input() Data: any;
  keys = [""];
  isEditable10= false;
  certificateId: string;
  certificateStatus: CertificateGroupStatusDto;
  status = false;
  constructor( private _permissionChecker: PermissionCheckerService,private dataservice: DataService,private injector: Injector, private xetNghiemKhacServiceServiceProxy: XetNghiemKhacServiceServiceProxy) {
    super(injector);
   }

  ngOnInit() {
    for (const item of this.statusDataCheck.items) {
      if(item.group == "XetNghiemKhac")
      {
        this.status = true;
      }
    }
    this.certificateId = this.dataservice.getData();
    if(this._permissionChecker.isGranted("Pages.XetNghiemKhac.Create")){
      this.isEditable10 = true;
      console.log(this.isEditable10) 
    }
    let object = Object.fromEntries(new Map(this.Data.items.map(obj=>{
      return [obj.key, obj.value]
    })));
    this.xetnghiemkhac = object as unknown as XetNghiemKhacViewModel;
  }
  save(): void{
    var inputxetnghiem1s : CreateMedicationKeyResultDto[] = [];
    const item1 = new CreateMedicationKeyResultDto(
      {
        key: 'xetnghiemkhac_text_ketluan',
        value:  this.xetnghiemkhac.xetnghiemkhac_text_ketluan|| '',
        certificateId: this.certificateId,  
        group: "XetNghiemKhac",
      }
    );const item2 = new CreateMedicationKeyResultDto(
      {
        key: 'xetnghiemkhac_text_ketqua',
        value:  this.xetnghiemkhac.xetnghiemkhac_text_ketqua|| '',
        certificateId: this.certificateId,
        group: "XetNghiemKhac",
      }
    );const item3 = new CreateMedicationKeyResultDto(
      {
        key: 'xetnghiemkhac_text_ketqua',
        value:  this.xetnghiemkhac.xetnghiemkhac_text_ketqua|| '',
        certificateId: this.certificateId,
        group: "XetNghiemKhac",
      }
    );
    inputxetnghiem1s.push(item1);
    inputxetnghiem1s.push(item2);
    inputxetnghiem1s.push(item3);
    if(this.status == true){
      this.xetNghiemKhacServiceServiceProxy.updateOrInsert(inputxetnghiem1s).subscribe(
        () => {
          this.notify.info(this.l('SavedSuccessfully.'));
        },
      );
    }else{
      this.xetNghiemKhacServiceServiceProxy.createList(inputxetnghiem1s).subscribe(
        () => {
          this.notify.info(this.l('SavedSuccessfully.'));
        },
      );
    }
  }

}
