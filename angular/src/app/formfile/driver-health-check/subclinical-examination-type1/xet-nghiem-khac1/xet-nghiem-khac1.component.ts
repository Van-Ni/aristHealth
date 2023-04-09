import { Component, Injector, Input, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CreateMedicationKeyResultDto, XetNghiemKhacServiceServiceProxy } from '@shared/service-proxies/service-proxies';
import { PermissionCheckerService } from 'abp-ng2-module';
class XetNghiemKhacViewModel{
  xetnghiemkhac_text_phanloai: string;
  xetnghiemkhac_text_ketqua: string;
  xetnghiemkhac_text_ketluan: string;
}
@Component({
  selector: 'app-xet-nghiem-khac1',
  templateUrl: './xet-nghiem-khac1.component.html',
  styleUrls: ['./xet-nghiem-khac1.component.css']
})
export class XetNghiemKhac1Component extends AppComponentBase  implements OnInit {
  xetnghiemkhac: XetNghiemKhacViewModel;
  @Input() Data: any;
  keys = [""];
  isEditable= false;
  constructor( private _permissionChecker: PermissionCheckerService,private injector: Injector, private xetNghiemKhacServiceServiceProxy: XetNghiemKhacServiceServiceProxy) {
    super(injector);
   }

  ngOnInit() {
    if(this._permissionChecker.isGranted("Pages.XetNghiemKhac.Create")){
      this.isEditable = true;
      console.log(this.isEditable) 
    }
    let object = Object.fromEntries(new Map(this.Data.items.map(obj=>{
      return [obj.key, obj.value]
    })));
    this.xetnghiemkhac = object as unknown as XetNghiemKhacViewModel;
  }
  save(): void{
    var inputmat1s : CreateMedicationKeyResultDto[] = [];
    for (const key in this.xetnghiemkhac) {
      if (Object.prototype.hasOwnProperty.call(this.xetnghiemkhac, key)) {
        const element = this.xetnghiemkhac[key];
        inputmat1s.push(new CreateMedicationKeyResultDto({
          key: key,
          value:  element,
          group: "XetNghiemKhac",
          certificateId: 'f4e1980b-40d9-49d5-9c59-7a364ced6253',
        }));        
      }
    }
    this.xetNghiemKhacServiceServiceProxy.createList(inputmat1s).subscribe(
      () => {
        
        this.notify.info(this.l('SavedSuccessfully.'));
      },
      
    );
  }

}
