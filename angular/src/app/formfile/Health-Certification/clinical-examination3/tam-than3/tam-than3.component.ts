import { Component, Injector, Input, OnInit } from '@angular/core';
import { CertificateKeyValueComponentBase } from '@app/manager/base-certificate';
import { DataService } from '@app/services/data.service';
import { AppComponentBase } from '@shared/app-component-base';
import { CertificateGroupStatusDto, KhoaThanKinhServiceServiceProxy, CreateMedicationKeyResultDto } from '@shared/service-proxies/service-proxies';
import { PermissionCheckerService } from 'abp-ng2-module';
interface TamThan3ViewModel {
  tamthan_selectbox_phanloai: string;
  tamthan_text_tamthan_noidung: string;
}
@Component({
  selector: 'app-tam-than3',
  templateUrl: './tam-than3.component.html',
  styleUrls: ['./tam-than3.component.css']
})
export class TamThan3Component extends CertificateKeyValueComponentBase<TamThan3ViewModel> implements OnInit {
  setViewModel(model: any) {
    let object = Object.fromEntries(new Map(model.items.map(obj=>{
      return [obj.key, obj.value]
    })));
    this.tamthan3 = object as unknown as TamThan3ViewModel;
  }
  tamthan3: TamThan3ViewModel;
  @Input() Data: any;
  keys = [""];
  isEditable= false;
  @Input() statusDataCheck: any;
  certificateId: string;
  certificateStatus: CertificateGroupStatusDto;
  status = false;
  notify: any;
  constructor( private _permissionChecker: PermissionCheckerService,private dataservice: DataService,private injector: Injector,private khoaThanKinhServiceServiceProxy: KhoaThanKinhServiceServiceProxy) {
    super(injector, dataservice)
    this.group = "tamthan";
   }

   ngOnInit() {
    super.ngOnInit();
    if(this._permissionChecker.isGranted("Pages.TamThan.Create")){
      this.isEditable = true;
    }

  }
  save(): void{
    var inputhohap2s : CreateMedicationKeyResultDto[] = [];
    const item1 = new CreateMedicationKeyResultDto(
      {
        key: 'tamthan_selectbox_phanloai',
        value:  this.tamthan3.tamthan_selectbox_phanloai|| '',
        certificateId: this.certificateId,  
        group: "tamthan",
      }
    );const item2 = new CreateMedicationKeyResultDto(
      {
        key: 'tamthan_text_tamthan_noidung',
        value:  this.tamthan3.tamthan_text_tamthan_noidung|| '',
        certificateId: this.certificateId,
        group: "tamthan",
      }
    );
    inputhohap2s.push(item1);
    inputhohap2s.push(item2);
    if(this.status == true){
      this.khoaThanKinhServiceServiceProxy.updateOrInsert(inputhohap2s).subscribe(
        () => {
          this.notify.info(this.l('SavedSuccessfully.'));
          this.dataservice.refreshData(this.certificateId);
        },
      );
    }else{
      this.khoaThanKinhServiceServiceProxy.createList(inputhohap2s).subscribe(
        () => {
          this.notify.info(this.l('SavedSuccessfully.'));
          this.dataservice.refreshData(this.certificateId);
        },
      );
    }
  }
}
