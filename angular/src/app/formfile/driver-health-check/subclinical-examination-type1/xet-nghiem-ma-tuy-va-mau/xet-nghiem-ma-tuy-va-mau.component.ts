import { Component, Injector, Input, OnInit } from '@angular/core';
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
export class XetNghiemMaTuyVaMauComponent extends AppComponentBase implements OnInit {
  xetnghiemmatuyvamau: XetnghiemMaTuyVaMauViewModel;
  @Input() Data: any;
  keys = [""];
  isEditable11= false;
  certificateId: string;
  certificateStatus: CertificateGroupStatusDto;
  status = false;
  @Input() statusDataCheck: any;
  constructor(private _permissionChecker: PermissionCheckerService,private dataservice: DataService,private injector: Injector, private xetNghiemMaTuyVaMauServiceServiceProxy: XetNghiemMaTuyVaMauServiceServiceProxy) {
    super(injector);
   }

  ngOnInit() {
    for (const item of this.statusDataCheck.items) {
      if(item.group == "XetNghiemKhac")
      {
        this.status = true;
      }
    }
    this.certificateId = this.dataservice.getData();
    if(this._permissionChecker.isGranted("Pages.XetNghiemMaTuyVaMau.Create")){
      this.isEditable11 = true;
    }
    let object = Object.fromEntries(new Map(this.Data.items.map(obj=>{
      return [obj.key, obj.value]
    })));
    this.xetnghiemmatuyvamau = object as unknown as XetnghiemMaTuyVaMauViewModel;
  }
  save(): void{
    var inputxetnghiemMT1s : CreateMedicationKeyResultDto[] = [];
    const item1 = new CreateMedicationKeyResultDto(
      {
        key: 'xetnghiemmatuyvamau_text_amphetamin',
        value:  this.xetnghiemmatuyvamau.xetnghiemmatuyvamau_text_amphetamin|| '',
        certificateId: this.certificateId,  
        group: "XetNghiemMaTuyVaMau",
      }
    );const item2 = new CreateMedicationKeyResultDto(
      {
        key: 'xetnghiemmatuyvamau_text_heroin',
        value:  this.xetnghiemmatuyvamau.xetnghiemmatuyvamau_text_heroin|| '',
        certificateId: this.certificateId,
        group: "XetNghiemMaTuyVaMau",
      }
    );const item3 = new CreateMedicationKeyResultDto(
      {
        key: 'xetnghiemmatuyvamau_text_marijuana',
        value:  this.xetnghiemmatuyvamau.xetnghiemmatuyvamau_text_marijuana|| '',
        certificateId: this.certificateId,
        group: "XetNghiemMaTuyVaMau",
      }
    );const item4 = new CreateMedicationKeyResultDto(
      {
        key: 'xetnghiemmatuyvamau_text_methamphetamin',
        value:  this.xetnghiemmatuyvamau.xetnghiemmatuyvamau_text_methamphetamin|| '',
        certificateId: this.certificateId,
        group: "XetNghiemMaTuyVaMau",
      }
    );const item5 = new CreateMedicationKeyResultDto(
      {
        key: 'xetnghiemmatuyvamau_text_nongdomau',
        value:  this.xetnghiemmatuyvamau.xetnghiemmatuyvamau_text_nongdomau|| '',
        certificateId: this.certificateId,
        group: "XetNghiemMaTuyVaMau",
      }
    );
    inputxetnghiemMT1s.push(item1);
    inputxetnghiemMT1s.push(item2);
    inputxetnghiemMT1s.push(item3);
    inputxetnghiemMT1s.push(item4);
    inputxetnghiemMT1s.push(item5);
    if(this.status == true){
      this.xetNghiemMaTuyVaMauServiceServiceProxy.updateOrInsert(inputxetnghiemMT1s).subscribe(
        () => {
          this.notify.info(this.l('SavedSuccessfully.'));
        },
      );
    }else{
      this.xetNghiemMaTuyVaMauServiceServiceProxy.createList(inputxetnghiemMT1s).subscribe(
        () => {
          this.notify.info(this.l('SavedSuccessfully.'));
        },
      );
    }
  }
}
