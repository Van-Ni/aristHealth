import { Component, Injector, Input, OnInit } from '@angular/core';
import { DataService } from '@app/services/data.service';
import { AppComponentBase } from '@shared/app-component-base';
import { CertificateGroupStatusDto, CreateMedicationKeyResultDto, TuanHoanServiceServiceProxy } from '@shared/service-proxies/service-proxies';
import { PermissionCheckerService } from 'abp-ng2-module';
interface TuanHoan1ViewModel {
  tuanhoan_selectbox_phanloai: string;
  tuanhoan_text_tuanhoan_noidung: string;
}
@Component({
  selector: 'app-tuan-hoan',
  templateUrl: './tuan-hoan.component.html',
  styleUrls: ['./tuan-hoan.component.css']
})
export class TuanHoanComponent  extends AppComponentBase implements OnInit {
  tuanhoan1: TuanHoan1ViewModel;
  @Input() Data: any;
  @Input() statusDataCheck: any;
  keys = [""];
  isEditable2= false;
  certificateId: string;
  certificateStatus: CertificateGroupStatusDto;
  status = false;
  notify: any;
  constructor( private _permissionChecker: PermissionCheckerService,private dataservice: DataService,private injector: Injector,private tuanHoanServiceServiceProxy: TuanHoanServiceServiceProxy) {
    super(injector);
   }

  ngOnInit() {
    for (const item of this.statusDataCheck.items) {
      if(item.group == "TuanHoan")
      {
        this.status = true;
      }
    }
    this.certificateId = this.dataservice.getData();
    if(this._permissionChecker.isGranted("Pages.TuanHoan.Create")){
      this.isEditable2 = true;
    }
    let object = Object.fromEntries(new Map(this.Data.items.map(obj=>{
      return [obj.key, obj.value]
    })));
    this.tuanhoan1 = object as unknown as TuanHoan1ViewModel;
  }
  save(): void{
    var inputhohap2s : CreateMedicationKeyResultDto[] = [];
    const item1 = new CreateMedicationKeyResultDto(
      {
        key: 'tuanhoan_selectbox_phanloai',
        value:  this.tuanhoan1.tuanhoan_selectbox_phanloai|| '',
        certificateId: this.certificateId,  
        group: "TuanHoan",
      }
    );const item2 = new CreateMedicationKeyResultDto(
      {
        key: 'tuanhoan_text_tuanhoan_noidung',
        value:  this.tuanhoan1.tuanhoan_text_tuanhoan_noidung|| '',
        certificateId: this.certificateId,
        group: "TuanHoan",
      }
    );
    inputhohap2s.push(item1);
    inputhohap2s.push(item2);
    if(this.status == true){
      this.tuanHoanServiceServiceProxy.updateOrInsert(inputhohap2s).subscribe(
        () => {
          this.notify.info(this.l('SavedSuccessfully.'));
        },
      );
    }else{
      this.tuanHoanServiceServiceProxy.createList(inputhohap2s).subscribe(
        () => {
          this.notify.info(this.l('SavedSuccessfully.'));
        },
      );
    }
  }
}
