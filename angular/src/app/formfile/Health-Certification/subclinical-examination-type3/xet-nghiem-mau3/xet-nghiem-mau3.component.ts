import { Component, Injector, OnInit } from '@angular/core';
import { CertificateKeyValueComponentBase } from '@app/manager/base-certificate';
import { DataService } from '@app/services/data.service';
import { CertificateGroupStatusDto, CreateMedicationKeyResultDto, XetNghiemMauServiceServiceProxy } from '@shared/service-proxies/service-proxies';
import { PermissionCheckerService } from 'abp-ng2-module';
interface XetNghiemMau3ViewModel{
  xetnghiemmau_text_soluonghc: string;
  xetnghiemmau_text_soluongbc: string;
  xetnghiemmau_text_soluongtc: string;
  xetnghiemmau_text_duongmau: string;
  xetnghiemmau_text_ure: string;
  xetnghiemmau_text_creatimin: string;
  xetnghiemmau_text_asat: string;
  xetnghiemmau_text_alat: string;
  xetnghiemmau_text_khac: string;
}
@Component({
  selector: 'app-xet-nghiem-mau3',
  templateUrl: './xet-nghiem-mau3.component.html',
  styleUrls: ['./xet-nghiem-mau3.component.css']
})
export class XetNghiemMau3Component extends CertificateKeyValueComponentBase<XetNghiemMau3ViewModel> implements OnInit {
  setViewModel(model: any) {
    let object = Object.fromEntries(new Map(model.items.map(obj=>{
      return [obj.key, obj.value]
    })));
    this.xetnghiemmau3 = object as unknown as XetNghiemMau3ViewModel;
  }
  xetnghiemmau3: XetNghiemMau3ViewModel;
  keys = [""];
  isEditable2= false;
  certificateId: string;
  certificateStatus: CertificateGroupStatusDto;
  status = false;
  constructor( private _permissionChecker: PermissionCheckerService,private dataservice: DataService,private injector: Injector,private XetNghiemMauServiceServiceProxy: XetNghiemMauServiceServiceProxy) {
    super(injector, dataservice)
    this.group = "xetnghiemmau";
   }

   ngOnInit() {
    super.ngOnInit();
    if(this._permissionChecker.isGranted("Pages.XetNghiemMau.Create")){
      this.isEditable2 = true;
    }

  }
  save(): void{
    var inputhohap2s : CreateMedicationKeyResultDto[] = [];
    const item1 = new CreateMedicationKeyResultDto(
      {
        key: 'xetnghiemmau_text_alat',
        value:  this.xetnghiemmau3.xetnghiemmau_text_alat|| '',
        certificateId: this.certificateId,  
        group: this.group,
      }
    );const item2 = new CreateMedicationKeyResultDto(
      {
        key: 'xetnghiemmau_text_asat',
        value:  this.xetnghiemmau3.xetnghiemmau_text_asat|| '',
        certificateId: this.certificateId,
        group: this.group,
      }
    );const item3 = new CreateMedicationKeyResultDto(
      {
        key: 'xetnghiemmau_text_creatimin',
        value:  this.xetnghiemmau3.xetnghiemmau_text_creatimin|| '',
        certificateId: this.certificateId,
        group: this.group,
      }
    );const item4 = new CreateMedicationKeyResultDto(
      {
        key: 'xetnghiemmau_text_duongmau',
        value:  this.xetnghiemmau3.xetnghiemmau_text_duongmau|| '',
        certificateId: this.certificateId,
        group: this.group,
      }
    );const item5 = new CreateMedicationKeyResultDto(
      {
        key: 'xetnghiemmau_text_khac',
        value:  this.xetnghiemmau3.xetnghiemmau_text_khac|| '',
        certificateId: this.certificateId,
        group: this.group,
      }
    );const item6 = new CreateMedicationKeyResultDto(
      {
        key: 'xetnghiemmau_text_soluongbc',
        value:  this.xetnghiemmau3.xetnghiemmau_text_soluongbc|| '',
        certificateId: this.certificateId,
        group: this.group,
      }
    );const item7 = new CreateMedicationKeyResultDto(
      {
        key: 'xetnghiemmau_text_soluonghc',
        value:  this.xetnghiemmau3.xetnghiemmau_text_soluonghc|| '',
        certificateId: this.certificateId,
        group: this.group,
      }
    );const item8 = new CreateMedicationKeyResultDto(
      {
        key: 'xetnghiemmau_text_soluongtc',
        value:  this.xetnghiemmau3.xetnghiemmau_text_soluongtc|| '',
        certificateId: this.certificateId,
        group: this.group,
      }
    );const item9 = new CreateMedicationKeyResultDto(
      {
        key: 'xetnghiemmau_text_ure',
        value:  this.xetnghiemmau3.xetnghiemmau_text_ure|| '',
        certificateId: this.certificateId,
        group: this.group,
      }
    );
    inputhohap2s.push(item1);
    inputhohap2s.push(item2);
    inputhohap2s.push(item3);
    inputhohap2s.push(item4);
    inputhohap2s.push(item5);
    inputhohap2s.push(item6);
    inputhohap2s.push(item7);
    inputhohap2s.push(item8);
    inputhohap2s.push(item9);
    if(this.status == true){
      this.XetNghiemMauServiceServiceProxy.updateOrInsert(inputhohap2s).subscribe(
        () => {
          this.notify.info(this.l('SavedSuccessfully.'));
          this.dataservice.refreshData(this.certificateId);
        },
      );
    }else{
      this.XetNghiemMauServiceServiceProxy.createList(inputhohap2s).subscribe(
        () => {
          this.notify.info(this.l('SavedSuccessfully.'));
          this.dataservice.refreshData(this.certificateId);
        },
      );
    }
  }
}
