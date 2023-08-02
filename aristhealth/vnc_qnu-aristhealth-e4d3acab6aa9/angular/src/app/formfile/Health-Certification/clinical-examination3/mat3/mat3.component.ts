import { Component, Injector, Input, OnInit } from '@angular/core';
import { DataService } from '@app/services/data.service';
import { AppComponentBase } from '@shared/app-component-base';
import { CertificateGroupStatusDto, KhoaMatServiceServiceProxy, CreateMedicationKeyResultDto } from '@shared/service-proxies/service-proxies';
import { PermissionCheckerService } from 'abp-ng2-module';
interface Mat3ViewModel {
  mat_text_kk_mt: string;
  mat_text_kk_mp: string;
  mat_text_ck_mt: string;
  mat_text_ck_mp: string;
  mat_text_cbvm: string;
  mat_selectbox_phanloai: string; 
}
@Component({
  selector: 'app-mat3',
  templateUrl: './mat3.component.html',
  styleUrls: ['./mat3.component.css']
})
export class Mat3Component extends AppComponentBase implements OnInit {
  
  @Input() Data: any;
  mat3 :Mat3ViewModel;  
  @Input() statusDataCheck: any;
  keys = [""];
  isEditable3= false;
  certificateId: string;
  certificateStatus: CertificateGroupStatusDto;
  status = false;
  constructor(private dataservice: DataService,private injector: Injector, private khoaMatServiceServiceProxy: KhoaMatServiceServiceProxy, private _permissionChecker: PermissionCheckerService,) {
    super(injector)
   }
  
  ngOnInit() {
    for (const item of this.statusDataCheck.items) {
      if(item.group == "Mat")
      {
        this.status = true;
      }
    }
    if(this._permissionChecker.isGranted("Pages.Mat.Create")){
      this.isEditable3 = true;
    }
    this.certificateId = this.dataservice.getData();
      let object = Object.fromEntries(new Map(this.Data.items.map(obj=>{
      return [obj.key, obj.value]
    })));
      this.mat3 = object as unknown as Mat3ViewModel;
  }
  save(): void {
    const inputmat1s : CreateMedicationKeyResultDto[] = [];
    const item15 = new CreateMedicationKeyResultDto(
      {
        key: 'mat_text_cbvm',
        value:  this.mat3.mat_text_cbvm|| '',
        certificateId: this.certificateId,
        group: "Mat",
      }
    );const item10 = new CreateMedicationKeyResultDto(
      {
        key: 'mat_text_ck_mp',
        value:  this.mat3.mat_text_ck_mp|| '',
        certificateId: this.certificateId,
        group: "Mat",
      }
    );const item11 = new CreateMedicationKeyResultDto(
      {
        key: 'mat_text_ck_mt',
        value:  this.mat3.mat_text_ck_mt|| '',
        certificateId: this.certificateId,
        group: "Mat",
      }
    );const item12 = new CreateMedicationKeyResultDto(
      {
        key: 'mat_text_kk_mp',
        value:  this.mat3.mat_text_kk_mp|| '',
        certificateId: this.certificateId,
        group: "Mat",
      }
    );const item13 = new CreateMedicationKeyResultDto(
      {
        key: 'mat_text_kk_mt',
        value:  this.mat3.mat_text_kk_mt|| '',
        certificateId: this.certificateId,
        group: "Mat",
      }
    );
    const item14 = new CreateMedicationKeyResultDto(
      {
        key: 'mat_selectbox_phanloai',
        value:  this.mat3.mat_selectbox_phanloai||'',
        certificateId: this.certificateId,
        group: "Mat",
      }
    );
    inputmat1s.push(item10);
    inputmat1s.push(item11);
    inputmat1s.push(item12);
    inputmat1s.push(item13);
    inputmat1s.push(item14);
    inputmat1s.push(item15);
    if(this.status == true){
      this.khoaMatServiceServiceProxy.updateOrInsert(inputmat1s).subscribe(
        () => {
          this.notify.info(this.l('SavedSuccessfully.'));
        },
      );
    }else{
      this.khoaMatServiceServiceProxy.createList(inputmat1s).subscribe(
        () => {
          this.notify.info(this.l('SavedSuccessfully.'));
        },
      );
    }
  }
}
