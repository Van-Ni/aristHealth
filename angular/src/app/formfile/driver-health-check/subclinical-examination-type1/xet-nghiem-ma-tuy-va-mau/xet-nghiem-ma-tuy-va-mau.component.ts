import { Component, Injector, Input, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CreateMedicationKeyResultDto, XetNghiemMaTuyVaMauServiceServiceProxy } from '@shared/service-proxies/service-proxies';
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
  isEditable= false;
  constructor(private _permissionChecker: PermissionCheckerService,private injector: Injector, private xetNghiemMaTuyVaMauServiceServiceProxy: XetNghiemMaTuyVaMauServiceServiceProxy) {
    super(injector);
   }

  ngOnInit() {
    if(this._permissionChecker.isGranted("Pages.HoHap.Create")){
      this.isEditable = true;
      console.log(this.isEditable) 
    }
    let object = Object.fromEntries(new Map(this.Data.items.map(obj=>{
      return [obj.key, obj.value]
    })));
    this.xetnghiemmatuyvamau = object as unknown as XetnghiemMaTuyVaMauViewModel;
  }
  save(): void{
    var inputmat1s : CreateMedicationKeyResultDto[] = [];
    for (const key in this.xetnghiemmatuyvamau) {
      if (Object.prototype.hasOwnProperty.call(this.xetnghiemmatuyvamau, key)) {
        const element = this.xetnghiemmatuyvamau[key];
        inputmat1s.push(new CreateMedicationKeyResultDto({
          key: key,
          value:  element,
          group: "HoHap",
          certificateId: 'f4e1980b-40d9-49d5-9c59-7a364ced6253',
        }));        
      }
    }
    this.xetNghiemMaTuyVaMauServiceServiceProxy.createList(inputmat1s).subscribe(
      () => {
        
        this.notify.info(this.l('SavedSuccessfully.'));
      },
      
    );
  }
}
