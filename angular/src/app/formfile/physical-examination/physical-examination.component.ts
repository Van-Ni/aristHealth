import { Component, Injector, Input, OnInit } from '@angular/core';
import { CertificateKeyValueComponentBase } from '@app/manager/base-certificate';
import { DataService } from '@app/services/data.service';
import { AppComponentBase } from '@shared/app-component-base';
import { CertificateGroupStatusDto, CreateMedicationKeyResultDto, KhamTheLucServiceServiceProxy } from '@shared/service-proxies/service-proxies';
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
    let object = Object.fromEntries(new Map(this.Data.items.map(obj=>{
      return [obj.key, obj.value]
    })));
    this.khamtheluc = object as unknown as KhamTheLucViewModel;
  }
  save(): void{
    var inputkhamtheluc : CreateMedicationKeyResultDto[] = [];
    const item1 = new CreateMedicationKeyResultDto(
      {
        key: 'khamtheluc_text_cannang',
        value:  this.khamtheluc.khamtheluc_text_cannang|| '',
        certificateId: this.certificateId,  
        group: this.group,
      }
    );const item2 = new CreateMedicationKeyResultDto(
      {
        key: 'khamtheluc_text_chieucao',
        value:  this.khamtheluc.khamtheluc_text_chieucao|| '',
        certificateId: this.certificateId,
        group: this.group,
      }
    );const item3 = new CreateMedicationKeyResultDto(
      {
        key: 'khamtheluc_text_huyetap',
        value:  this.khamtheluc.khamtheluc_text_huyetap|| '',
        certificateId: this.certificateId,
        group: this.group,
      }
    );const item4 = new CreateMedicationKeyResultDto(
      {
        key: 'khamtheluc_text_mach',
        value:  this.khamtheluc.khamtheluc_text_mach|| '',
        certificateId: this.certificateId,
        group: this.group,
      }
    );const item5 = new CreateMedicationKeyResultDto(
      {
        key: 'khamtheluc_text_phanloaitheluc',
        value:  this.khamtheluc.khamtheluc_text_phanloaitheluc|| '',
        certificateId: this.certificateId,
        group: this.group,
      }
    );
    inputkhamtheluc.push(item1);
    inputkhamtheluc.push(item2);
    inputkhamtheluc.push(item3);
    inputkhamtheluc.push(item4);
    inputkhamtheluc.push(item5);
    if(this.status == true){
      this.khamTheLucServiceServiceProxy.updateOrInsert(inputkhamtheluc).subscribe(
        () => {
          this.notify.info(this.l('SavedSuccessfully.'));
          this.dataservice.refreshData(this.certificateId);
        },
      );
    }else{
      this.khamTheLucServiceServiceProxy.createList(inputkhamtheluc).subscribe(
        () => {
          this.notify.info(this.l('SavedSuccessfully.'));
          this.dataservice.refreshData(this.certificateId);
        },
      );
    }
  }
}
