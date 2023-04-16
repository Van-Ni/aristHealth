import { Component, Injector, Input, OnInit } from '@angular/core';
import { DataService } from '@app/services/data.service';
import { AppComponentBase } from '@shared/app-component-base';
import { CertificateGroupStatusDto } from '@shared/service-proxies/service-proxies';
import { PermissionCheckerService } from 'abp-ng2-module';
class XetNghiemKhac2ViewModel{
  xetnghiemkhac_text_ketqua: string;
}
@Component({
  selector: 'app-subclinical-examination-type2',
  templateUrl: './subclinical-examination-type2.component.html',
  styleUrls: ['./subclinical-examination-type2.component.css']
})
export class SubclinicalExaminationType2Component extends AppComponentBase  implements OnInit {
  xetnghiemkhac: XetNghiemKhac2ViewModel;
  @Input() statusDataCheck: any;
  @Input() Data: any;
  keys = [""];
  isEditable10= false;
  certificateId: string;
  certificateStatus: CertificateGroupStatusDto;
  status = false;
  constructor( private _permissionChecker: PermissionCheckerService,private dataservice: DataService,private injector: Injector) {
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
    console.log("xetnghiem", this.Data.items);
    
    if(this._permissionChecker.isGranted("Pages.XetNghiemKhac.Create")){
      this.isEditable10 = true;
      console.log(this.isEditable10) 
    }
    let object = Object.fromEntries(new Map(this.Data.items.map(obj=>{
      return [obj.key, obj.value]
    })));
    this.xetnghiemkhac = object as unknown as XetNghiemKhac2ViewModel;
  }
  save(): void{
    // var inputxetnghiem1s : CreateMedicationKeyResultDto[] = [];
    // const item2 = new CreateMedicationKeyResultDto(
    //   {
    //     key: 'xetnghiemkhac_text_ketqua',
    //     value:  this.xetnghiemkhac.xetnghiemkhac_text_ketqua|| '',
    //     certificateId: this.certificateId,
    //     group: "XetNghiemKhac",
    //   }
    // );
    // inputxetnghiem1s.push(item2);
    // if(this.status == true){
    //   this.xetNghiemKhacServiceServiceProxy.updateOrInsert(inputxetnghiem1s).subscribe(
    //     () => {
    //       this.notify.info(this.l('SavedSuccessfully.'));
    //     },
    //   );
    // }else{
    //   this.xetNghiemKhacServiceServiceProxy.createList(inputxetnghiem1s).subscribe(
    //     () => {
    //       this.notify.info(this.l('SavedSuccessfully.'));
    //     },
    //   );
    // }
  }

}
