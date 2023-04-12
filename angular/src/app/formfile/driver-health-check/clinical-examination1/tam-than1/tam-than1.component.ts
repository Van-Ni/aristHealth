import { Component, Injector, Input, OnInit } from '@angular/core';
import { CertificateKeyValueComponentBase } from '@app/manager/base-certificate';
import { DataService } from '@app/services/data.service';
import { AppComponentBase } from '@shared/app-component-base';
import { CertificateGroupStatusDto, CreateMedicationKeyResultDto, KhoaTamThanServiceServiceProxy } from '@shared/service-proxies/service-proxies';
import { PermissionCheckerService } from 'abp-ng2-module';
interface TamThan1ViewModel {
  tamthan_text_noidung: string;
  tamthan_selectbox_phanloai: string;
  tamthan_text_tamthan_ketluan: string;
}
@Component({
  selector: 'app-tam-than1',
  templateUrl: './tam-than1.component.html',
  styleUrls: ['./tam-than1.component.css']
})
export class TamThan1Component  extends CertificateKeyValueComponentBase<TamThan1ViewModel>  implements OnInit {
  setViewModel(model: any) {
    let object = Object.fromEntries(new Map(model.items.map(obj=>{
      return [obj.key, obj.value]
    })));
    this.tamthan1 = object as unknown as TamThan1ViewModel;
  }
  tamthan1: TamThan1ViewModel;
  @Input() Data: any;
  @Input() statusDataCheck: any;
  keys = [""];
  isEditable6= false;
  certificateId: string;
  certificateStatus: CertificateGroupStatusDto;
  status = false;
  constructor(private _permissionChecker: PermissionCheckerService,private dataservice: DataService,private injector: Injector, private khoaTamThanServiceServiceProxy: KhoaTamThanServiceServiceProxy) {
    super(injector, dataservice)
    this.group = "tamthan";
   }
  
  ngOnInit() {
    super.ngOnInit();
    
    if(this._permissionChecker.isGranted("Pages.TamThan.Create")){
      this.isEditable6 = true;
    }

  }
  save(): void{
    var inputtamthan1s : CreateMedicationKeyResultDto[] = [];
    const item1 = new CreateMedicationKeyResultDto(
      {
        key: 'tamthan_selectbox_phanloai',
        value:  this.tamthan1.tamthan_selectbox_phanloai|| '',
        certificateId: this.certificateId,  
        group: this.group,
      }
    );const item2 = new CreateMedicationKeyResultDto(
      {
        key: 'tamthan_text_tamthan_ketluan',
        value:  this.tamthan1.tamthan_text_tamthan_ketluan|| '',
        certificateId: this.certificateId,
        group: this.group,
      }
    );
    inputtamthan1s.push(item1);
    inputtamthan1s.push(item2);
    if(this.status == true){
      this.khoaTamThanServiceServiceProxy.updateOrInsert(inputtamthan1s).subscribe(
        () => {
          this.notify.info(this.l('SavedSuccessfully.'));
          this.dataservice.refreshData(this.certificateId);
        },
      );
    }else{
      this.khoaTamThanServiceServiceProxy.createList(inputtamthan1s).subscribe(
        () => {
          this.notify.info(this.l('SavedSuccessfully.'));
          this.dataservice.refreshData(this.certificateId);
        },
      );
    }
  }


}
