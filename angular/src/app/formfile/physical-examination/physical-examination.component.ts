import { Component, Injector, Input, OnInit } from '@angular/core';
import { CertificateKeyValueComponentBase } from '@app/manager/base-certificate';
import { DataService } from '@app/services/data.service';
import { AppComponentBase } from '@shared/app-component-base';
import { CertificateGroupStatusDto, CreateCertificateGroupStatusDto, KeyValues, KhamTheLucServiceServiceProxy, Values } from '@shared/service-proxies/service-proxies';
import { PermissionCheckerService } from 'abp-ng2-module';
class KhamTheLucViewModel {
  khamtheluc_text_cannang: string;
  khamtheluc_text_chieucao: string;
  khamtheluc_text_mach: string;
  khamtheluc_text_huyetap: string;
  khamtheluc_text_phanloaitheluc: string;
}
@Component({
  selector: 'app-physical-examination',
  templateUrl: './physical-examination.component.html',
  styleUrls: ['./physical-examination.component.css']
})
export class PhysicalExaminationComponent extends CertificateKeyValueComponentBase<KhamTheLucViewModel> implements OnInit {
  setViewModel(model: any) {
    let object = Object.fromEntries(new Map(model.items.map(obj=>{
      return [obj.key, obj.value]})));
      this.khamtheluc = object as unknown as KhamTheLucViewModel;
  }
  khamtheluc: KhamTheLucViewModel;
  @Input() Data: any;
  @Input() statusDataCheck: any;
  data:  any;
  statusDataCheck1: any;
  keys = [""];
  isEditable= false;
  certificateId: string;
  certificateStatus: CertificateGroupStatusDto;
  status = false;
  constructor(private _permissionChecker: PermissionCheckerService,private dataservice: DataService,private injector: Injector,private khamTheLucServiceServiceProxy: KhamTheLucServiceServiceProxy) { 
    super(injector, dataservice)
    this.group = "khamtheluc";
   }

   ngOnInit() {
    super.ngOnInit();
    if(this._permissionChecker.isGranted("Pages.KhamTheLuc.Create")){
      this.isEditable = true;
      console.log(this.isEditable) 
    }
  }
  save(): void{
    const data  =  {
      keys: {
        "hohap_selectbox_phanloai": new Values({ value: this.khamtheluc.khamtheluc_text_cannang }),
        "khamtheluc_text_chieucao": new Values({ value: this.khamtheluc.khamtheluc_text_chieucao }),
        "khamtheluc_text_huyetap": new Values({ value: this.khamtheluc.khamtheluc_text_huyetap }),
        "khamtheluc_text_mach": new Values({ value: this.khamtheluc.khamtheluc_text_mach }),
        "khamtheluc_text_phanloaitheluc": new Values({ value: this.khamtheluc.khamtheluc_text_phanloaitheluc }),
      }
    };
    const input = new CreateCertificateGroupStatusDto(
      {
        userId : this.appSession.userId,
        certificateId: this.certificateId,
        group: this.group,
        status : false,
        content : new KeyValues(data),
      }
    );
    if(this.status == true){
      this.khamTheLucServiceServiceProxy.updateOrInsert(input).subscribe(
        () => {
          this.notify.info(this.l('SavedSuccessfully.'));
          this.dataservice.refreshData(this.certificateId);
        },
      );
    }else{
      this.khamTheLucServiceServiceProxy.createList(input).subscribe(
        () => {
          this.notify.info(this.l('SavedSuccessfully.'));
          this.dataservice.refreshData(this.certificateId);
        },
      );
    }
  }
}
