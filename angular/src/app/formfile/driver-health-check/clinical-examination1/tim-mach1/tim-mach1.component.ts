import { Component, Injector, Input, OnInit } from '@angular/core';
import { CertificateKeyValueComponentBase } from '@app/manager/base-certificate';
import { DataService } from '@app/services/data.service';
import { AppComponentBase } from '@shared/app-component-base';
import { CertificateGroupStatusDto, CreateMedicationKeyResultDto, KhoaTimMachServiceServiceProxy } from '@shared/service-proxies/service-proxies';
import { PermissionCheckerService } from 'abp-ng2-module';
interface TimMach1ViewModel {
  timmach_text_noidung: string;
  timmach_text_mach: string;
  timmach_text_huyetap: string;
  timmach_selectbox_phanloai: string;
  timmach_text_timmach_ketluan: string;
}
@Component({
  selector: 'app-tim-mach1',
  templateUrl: './tim-mach1.component.html',
  styleUrls: ['./tim-mach1.component.css']
})
export class TimMach1Component  extends CertificateKeyValueComponentBase<TimMach1ViewModel> implements OnInit {
  setViewModel(model: any) {
    let object = Object.fromEntries(new Map(model.items.map(obj=>{
      return [obj.key, obj.value]
    })));
    this.timmach1 = object as unknown as TimMach1ViewModel;
  }
  timmach1: TimMach1ViewModel;
  @Input() statusDataCheck: any;
  @Input() Data: any;
  keys = [""];
  isEditable9= false;
  certificateId: string;
  certificateStatus: CertificateGroupStatusDto;
  status = false;
  constructor( private _permissionChecker: PermissionCheckerService,private dataservice: DataService,private injector: Injector, private khoaTimMachServiceServiceProxy: KhoaTimMachServiceServiceProxy) { 
    super(injector, dataservice)
    this.group = "timmach";
   }
  
  ngOnInit() {
    super.ngOnInit();
    if(this._permissionChecker.isGranted("Pages.TimMach.Create")){
      this.isEditable9 = true;
    }

  }
  save(): void{
    var inputtimmach1s : CreateMedicationKeyResultDto[] = [];
    const item1 = new CreateMedicationKeyResultDto(
      {
        key: 'timmach_selectbox_phanloai',
        value:  this.timmach1.timmach_selectbox_phanloai|| '',
        certificateId: this.certificateId,  
        group: this.group,
      }
    );const item2 = new CreateMedicationKeyResultDto(
      {
        key: 'timmach_text_huyetap',
        value:  this.timmach1.timmach_text_huyetap|| '',
        certificateId: this.certificateId,
        group: this.group,
      }
    );const item3 = new CreateMedicationKeyResultDto(
      {
        key: 'timmach_text_mach',
        value:  this.timmach1.timmach_text_mach|| '',
        certificateId: this.certificateId,
        group: this.group,
      }
    );const item4 = new CreateMedicationKeyResultDto(
      {
        key: 'timmach_text_noidung',
        value:  this.timmach1.timmach_text_noidung|| '',
        certificateId: this.certificateId,
        group: this.group,
      }
    );const item5 = new CreateMedicationKeyResultDto(
      {
        key: 'timmach_text_timmach_ketluan',
        value:  this.timmach1.timmach_text_timmach_ketluan|| '',
        certificateId: this.certificateId,
        group: this.group,
      }
    );
    inputtimmach1s.push(item1);
    inputtimmach1s.push(item2);
    inputtimmach1s.push(item3);
    inputtimmach1s.push(item4);
    inputtimmach1s.push(item5);
    if(this.status == true){
      this.khoaTimMachServiceServiceProxy.updateOrInsert(inputtimmach1s).subscribe(
        () => {
          this.notify.info(this.l('SavedSuccessfully.'));
          this.dataservice.refreshData(this.certificateId);
        },
      );
    }else{
      this.khoaTimMachServiceServiceProxy.createList(inputtimmach1s).subscribe(
        () => {
          this.notify.info(this.l('SavedSuccessfully.'));
          this.dataservice.refreshData(this.certificateId);
        },
      );
    }
  }

}
