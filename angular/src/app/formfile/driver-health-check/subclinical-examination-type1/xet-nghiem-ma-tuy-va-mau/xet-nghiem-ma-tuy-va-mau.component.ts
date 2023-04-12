import { Component, Injector, Input, OnInit } from '@angular/core';
import { CertificateKeyValueComponentBase } from '@app/manager/base-certificate';
import { DataService } from '@app/services/data.service';
import { AppComponentBase } from '@shared/app-component-base';
import { CertificateGroupStatusDto, CreateMedicationKeyResultDto, XetNghiemMaTuyVaMauServiceServiceProxy } from '@shared/service-proxies/service-proxies';
import { PermissionCheckerService } from 'abp-ng2-module';
interface XetnghiemMaTuyVaMauViewModel{
  xetnghiemmatuyvamau_text_heroin: string;
  xetnghiemmatuyvamau_text_amphetamin: string;
  xetnghiemmatuyvamau_text_methamphetamin: string;
  xetnghiemmatuyvamau_text_marijuana: string;
  xetnghiemmatuyvamau_text_nongdomau: string;
}
@Component({
  selector: 'app-xet-nghiem-ma-tuy-va-mau',
  templateUrl: './xet-nghiem-ma-tuy-va-mau.component.html',
  styleUrls: ['./xet-nghiem-ma-tuy-va-mau.component.css']
})
export class XetNghiemMaTuyVaMauComponent extends CertificateKeyValueComponentBase<XetnghiemMaTuyVaMauViewModel> implements OnInit {
  setViewModel(model: any) {
    let object = Object.fromEntries(new Map(model.items.map(obj=>{
      return [obj.key, obj.value]
    })));
    this.xetnghiemmatuyvamau = object as unknown as XetnghiemMaTuyVaMauViewModel;
  }
  xetnghiemmatuyvamau: XetnghiemMaTuyVaMauViewModel = {
    xetnghiemmatuyvamau_text_heroin: 'Âm tính',
    xetnghiemmatuyvamau_text_amphetamin: 'Âm tính',
    xetnghiemmatuyvamau_text_methamphetamin: 'Âm tính',
    xetnghiemmatuyvamau_text_marijuana: 'Âm tính',
    xetnghiemmatuyvamau_text_nongdomau: '0.00 mgld'
  };
  @Input() Data: any;
  keys = [""];
  isEditable11= false;
  certificateId: string;
  certificateStatus: CertificateGroupStatusDto;
  status = false;
  @Input() statusDataCheck: any;
  constructor(private _permissionChecker: PermissionCheckerService,private dataservice: DataService,private injector: Injector, private xetNghiemMaTuyVaMauServiceServiceProxy: XetNghiemMaTuyVaMauServiceServiceProxy) {
    super(injector, dataservice)
    this.group = "xetnghiemmatuyvamau";
   }

   ngOnInit() {
    super.ngOnInit();
    if(this._permissionChecker.isGranted("Pages.XetNghiemMaTuyVaMau.Create")){
      this.isEditable11 = true;
    }

  }
  save(): void{
    var inputxetnghiemMT1s : CreateMedicationKeyResultDto[] = [];
    const item1 = new CreateMedicationKeyResultDto(
      {
        key: 'xetnghiemmatuyvamau_text_amphetamin',
        value:  this.xetnghiemmatuyvamau.xetnghiemmatuyvamau_text_amphetamin|| '',
        certificateId: this.certificateId,  
        group: this.group ,
      }
    );const item2 = new CreateMedicationKeyResultDto(
      {
        key: 'xetnghiemmatuyvamau_text_heroin',
        value:  this.xetnghiemmatuyvamau.xetnghiemmatuyvamau_text_heroin|| '',
        certificateId: this.certificateId,
        group: this.group ,
      }
    );const item3 = new CreateMedicationKeyResultDto(
      {
        key: 'xetnghiemmatuyvamau_text_marijuana',
        value:  this.xetnghiemmatuyvamau.xetnghiemmatuyvamau_text_marijuana|| '',
        certificateId: this.certificateId,
        group: this.group ,
      }
    );const item4 = new CreateMedicationKeyResultDto(
      {
        key: 'xetnghiemmatuyvamau_text_methamphetamin',
        value:  this.xetnghiemmatuyvamau.xetnghiemmatuyvamau_text_methamphetamin|| '',
        certificateId: this.certificateId,
        group: this.group ,
      }
    );const item5 = new CreateMedicationKeyResultDto(
      {
        key: 'xetnghiemmatuyvamau_text_nongdomau',
        value:  this.xetnghiemmatuyvamau.xetnghiemmatuyvamau_text_nongdomau|| '',
        certificateId: this.certificateId,
        group:this.group ,
      }
    );
    inputxetnghiemMT1s.push(item1);
    inputxetnghiemMT1s.push(item2);
    inputxetnghiemMT1s.push(item3);
    inputxetnghiemMT1s.push(item4);
    inputxetnghiemMT1s.push(item5);
    if(this.status){
      this.xetNghiemMaTuyVaMauServiceServiceProxy.updateOrInsert(inputxetnghiemMT1s).subscribe(
        () => {
          this.notify.info(this.l('SavedSuccessfully.'));
          this.dataservice.refreshData(this.certificateId);
        },
      );
    }else{
      this.xetNghiemMaTuyVaMauServiceServiceProxy.createList(inputxetnghiemMT1s).subscribe(
        () => {
          this.notify.info(this.l('SavedSuccessfully.'));
          this.dataservice.refreshData(this.certificateId);
        },
      );
    }
  }
}
