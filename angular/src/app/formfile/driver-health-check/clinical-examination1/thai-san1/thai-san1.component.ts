import { Component, Injector, Input, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CreateMedicationKeyResultDto, KhoaThaiSanServiceServiceProxy } from '@shared/service-proxies/service-proxies';
import { PermissionCheckerService } from 'abp-ng2-module';
interface ThaiSan1ViewModel {
  thaisan_text_noidung: string;
  thaisan_selectbox_phanloai: string;
  thaisan_text_thaisan_ketluan: string;
}
@Component({
  selector: 'app-thai-san1',
  templateUrl: './thai-san1.component.html',
  styleUrls: ['./thai-san1.component.css']
})
export class ThaiSan1Component extends AppComponentBase implements OnInit {
  thaisan1: ThaiSan1ViewModel;
  @Input() statusDataCheck: any;
  @Input() Data: any;
  keys = [""];
  isEditable= false;
  constructor(private _permissionChecker: PermissionCheckerService,private injector: Injector, private khoaThaiSanServiceServiceProxy: KhoaThaiSanServiceServiceProxy) { 
    super(injector)
  }

  ngOnInit() {
    if(this._permissionChecker.isGranted("Pages.ThaiSan.Create")){
      this.isEditable = true;
      console.log(this.isEditable) 
    }
    let object = Object.fromEntries(new Map(this.Data.items.map(obj=>{
      return [obj.key, obj.value]
    })));
    this.thaisan1 = object as unknown as ThaiSan1ViewModel;
  }
  save(): void{
    var inputmat1s : CreateMedicationKeyResultDto[] = [];
    for (const key in this.thaisan1) {
      if (Object.prototype.hasOwnProperty.call(this.thaisan1, key)) {
        const element = this.thaisan1[key];
        inputmat1s.push(new CreateMedicationKeyResultDto({
          key: key,
          value:  element,
          group: "ThaiSan",
          certificateId: 'f4e1980b-40d9-49d5-9c59-7a364ced6253',
        }));        
      }
    }
    this.khoaThaiSanServiceServiceProxy.createList(inputmat1s).subscribe(
      () => {
        
        this.notify.info(this.l('SavedSuccessfully.'));
      },
      
    );
  }


}
