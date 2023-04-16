import { Component, Injector, Input, OnInit } from '@angular/core';
import { CertificateKeyValueComponentBase } from '@app/manager/base-certificate';
import { DataService } from '@app/services/data.service';
import { AppComponentBase } from '@shared/app-component-base';
import { CertificateGroupStatusDto, CreateCertificateGroupStatusDto, KeyValues, Values, XetNghiemMaTuyVaMauServiceServiceProxy } from '@shared/service-proxies/service-proxies';
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
    for (const key in this.xetnghiemmatuyvamau) {
      if (Object.prototype.hasOwnProperty.call(this.xetnghiemmatuyvamau, key)) {
        const item = model.items.find(i => i.key === key);
        if(item){
          this.xetnghiemmatuyvamau[key] = item.value;
        }
      }
    }
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
    const data  =  {
      keys: {
        "xetnghiemmatuyvamau_text_amphetamin": new Values({ value: this.xetnghiemmatuyvamau.xetnghiemmatuyvamau_text_amphetamin }),
        "xetnghiemmatuyvamau_text_heroin": new Values({ value: this.xetnghiemmatuyvamau.xetnghiemmatuyvamau_text_heroin }),
        "xetnghiemmatuyvamau_text_marijuana": new Values({ value: this.xetnghiemmatuyvamau.xetnghiemmatuyvamau_text_marijuana }),
        "xetnghiemmatuyvamau_text_methamphetamin": new Values({ value: this.xetnghiemmatuyvamau.xetnghiemmatuyvamau_text_methamphetamin }),
        "xetnghiemmatuyvamau_text_nongdomau": new Values({ value: this.xetnghiemmatuyvamau.xetnghiemmatuyvamau_text_nongdomau }),
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
    if(this.status){
      this.xetNghiemMaTuyVaMauServiceServiceProxy.updateOrInsert(input).subscribe(
        () => {
          this.notify.info(this.l('SavedSuccessfully.'));
          this.dataservice.refreshData(this.certificateId);
        },
      );
    }else{
      this.xetNghiemMaTuyVaMauServiceServiceProxy.createList(input).subscribe(
        () => {
          this.notify.info(this.l('SavedSuccessfully.'));
          this.dataservice.refreshData(this.certificateId);
        },
      );
    }
  }
}
