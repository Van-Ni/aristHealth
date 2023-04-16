import { Component, Injector, Input, OnInit } from '@angular/core';
import { DataService } from '@app/services/data.service';
import { AppComponentBase } from '@shared/app-component-base';
import { CertificateGroupStatusDto, CreateMedicationKeyResultDto, KetLuanServiceServiceProxy } from '@shared/service-proxies/service-proxies';
import { PermissionCheckerService } from 'abp-ng2-module';
class KetLuan2ViewModel{
  ketluan_text_phanloai: string;
  ketluan_text_ketqua: string;
}
@Component({
  selector: 'app-current-conclusion-type2',
  templateUrl: './current-conclusion-type2.component.html',
  styleUrls: ['./current-conclusion-type2.component.css']
})
export class CurrentConclusionType2Component extends AppComponentBase  implements OnInit {
  ketluan2: KetLuan2ViewModel;
  @Input() statusDataCheck: any;
  @Input() Data: any;
  keys = [""];
  isEditable10= false;
  certificateId: string;
  certificateStatus: CertificateGroupStatusDto;
  status = false;
  constructor( private _permissionChecker: PermissionCheckerService,private dataservice: DataService,private injector: Injector, private KetLuanServiceServiceProxy: KetLuanServiceServiceProxy) {
    super(injector);
   }

  ngOnInit() {
    for (const item of this.statusDataCheck.items) {
      if(item.group == "KetLuan")
      {
        this.status = true;
      }
    }
    this.certificateId = this.dataservice.getData();
    console.log("xetnghiem", this.Data.items);
    
    if(this._permissionChecker.isGranted("Pages.KetLuan.Create")){
      this.isEditable10 = true;
    }
    let object = Object.fromEntries(new Map(this.Data.items.map(obj=>{
      return [obj.key, obj.value]
    })));
    this.ketluan2 = object as unknown as KetLuan2ViewModel;
  }
  save(): void{
    // var inputxetnghiem1s : CreateMedicationKeyResultDto[] = [];
    // const item2 = new CreateMedicationKeyResultDto(
    //   {
    //     key: 'ketluan_text_ketqua',
    //     value:  this.ketluan2.ketluan_text_ketqua|| '',
    //     certificateId: this.certificateId,
    //     group: "KetLuan",
    //   }
    // );const item1 = new CreateMedicationKeyResultDto(
    //   {
    //     key: 'ketluan_text_phanloai',
    //     value:  this.ketluan2.ketluan_text_phanloai|| '',
    //     certificateId: this.certificateId,
    //     group: "KetLuan",
    //   }
    // );
    // inputxetnghiem1s.push(item2);
    // inputxetnghiem1s.push(item1);
    // if(this.status == true){
    //   this.KetLuanServiceServiceProxy.updateOrInsert(inputxetnghiem1s).subscribe(
    //     () => {
    //       this.notify.info(this.l('SavedSuccessfully.'));
    //     },
    //   );
    // }else{
    //   this.KetLuanServiceServiceProxy.createList(inputxetnghiem1s).subscribe(
    //     () => {
    //       this.notify.info(this.l('SavedSuccessfully.'));
    //     },
    //   );
    // }
  }

}

