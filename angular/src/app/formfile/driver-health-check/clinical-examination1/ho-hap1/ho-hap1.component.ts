import { Component, Injector, Input, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CreateMedicationKeyResultDto, KhoaHoHapServiceServiceProxy } from '@shared/service-proxies/service-proxies';
import { PermissionCheckerService } from 'abp-ng2-module';
interface HoHap1ViewModel {
  hohap_text_noidung: string;
  hohap_selectbox_phanloai: string;
  hohap_text_hohap_ketluan: string;
}
@Component({
  selector: 'app-ho-hap1',
  templateUrl: './ho-hap1.component.html',
  styleUrls: ['./ho-hap1.component.css']
})
export class HoHap1Component extends AppComponentBase implements OnInit {
  hohap1: HoHap1ViewModel;
  @Input() Data: any;
  keys = [""];
  isEditable= false;
  constructor( private _permissionChecker: PermissionCheckerService,private injector: Injector,private khoaHoHapServiceServiceProxy: KhoaHoHapServiceServiceProxy) {
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
    this.hohap1 = object as unknown as HoHap1ViewModel;
  }
  save(): void{
    var inputmat1s : CreateMedicationKeyResultDto[] = [];
    for (const key in this.hohap1) {
      if (Object.prototype.hasOwnProperty.call(this.hohap1, key)) {
        const element = this.hohap1[key];
        inputmat1s.push(new CreateMedicationKeyResultDto({
          key: key,
          value:  element,
          group: "HoHap",
          certificateId: 'f4e1980b-40d9-49d5-9c59-7a364ced6253',
        }));        
      }
    }
    this.khoaHoHapServiceServiceProxy.createList(inputmat1s).subscribe(
      () => {
        
        this.notify.info(this.l('SavedSuccessfully.'));
      },
      
    );
  }
}
