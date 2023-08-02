import { Component, Injector, Input, OnInit } from '@angular/core';
import { CertificateKeyValueComponentBase } from '@app/manager/base-certificate';
import { DataService } from '@app/services/data.service';
import { AppComponentBase } from '@shared/app-component-base';
import { CertificateGroupStatusDto, CreateMedicationKeyResultDto, KetLuanServiceServiceProxy } from '@shared/service-proxies/service-proxies';
import { PermissionCheckerService } from 'abp-ng2-module';
class KetLuan1ViewModel{
  ketluan_text_phanloai: string;
}
@Component({
  selector: 'app-current-conclusion-type1',
  templateUrl: './current-conclusion-type1.component.html',
  styleUrls: ['./current-conclusion-type1.component.css']
})
export class CurrentConclusionType1Component extends CertificateKeyValueComponentBase<KetLuan1ViewModel>  implements OnInit {
  setViewModel(model: any) {
    let object = Object.fromEntries(new Map(model.items.map(obj=>{
      return [obj.key, obj.value]
    })));
    this.ketluan1 = object as unknown as KetLuan1ViewModel;
  }
  ketluan1: KetLuan1ViewModel;
  @Input() statusDataCheck: any;
  @Input() Data: any;
  keys = [""];
  isEditable10= false;
  certificateId: string;
  certificateStatus: CertificateGroupStatusDto;
  status = false;
  constructor( private _permissionChecker: PermissionCheckerService,private dataservice: DataService,private injector: Injector, private KetLuanServiceServiceProxy: KetLuanServiceServiceProxy) {
    super(injector, dataservice)
    this.group = "ketluan";
   }

   ngOnInit() {
    super.ngOnInit();
    
    if(this._permissionChecker.isGranted("Pages.KetLuan.Create")){
      this.isEditable10 = true;
    }

  }
  save(): void{
    var inputxetnghiem1s : CreateMedicationKeyResultDto[] = [];
    const item1 = new CreateMedicationKeyResultDto(
      {
        key: 'ketluan_text_phanloai',
        value:  this.ketluan1.ketluan_text_phanloai|| '',
        certificateId: this.certificateId,
        group: this.group,
      }
    );
    inputxetnghiem1s.push(item1);
    if(this.status == true){
      this.KetLuanServiceServiceProxy.updateOrInsert(inputxetnghiem1s).subscribe(
        () => {
          this.notify.info(this.l('SavedSuccessfully.'));
          this.dataservice.refreshData(this.certificateId);

        },
      );
    }else{
      this.KetLuanServiceServiceProxy.createList(inputxetnghiem1s).subscribe(
        () => {
          this.notify.info(this.l('SavedSuccessfully.'));
          this.dataservice.refreshData(this.certificateId);
        },
      );
    }
  }

}

