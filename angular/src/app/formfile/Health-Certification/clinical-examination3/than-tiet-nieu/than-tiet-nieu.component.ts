import { Component, Injector, Input, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CreateMedicationKeyResultDto, ThanTietNieuServiceServiceProxy } from '@shared/service-proxies/service-proxies';
import { PermissionCheckerService } from 'abp-ng2-module';
interface ThanTietNieu1ViewModel {
  thantietnieu_selectbox_phanloai: string;
  thantietnieu_text_hohap_ketluan: string;
}
@Component({
  selector: 'app-than-tiet-nieu',
  templateUrl: './than-tiet-nieu.component.html',
  styleUrls: ['./than-tiet-nieu.component.css']
})
export class ThanTietNieuComponent extends AppComponentBase implements OnInit {
  thantietnieu1: ThanTietNieu1ViewModel;
  @Input() Data: any;
  keys = [""];
  isEditable= false;
  constructor( private _permissionChecker: PermissionCheckerService,private injector: Injector,private thanTietNieuServiceServiceProxy: ThanTietNieuServiceServiceProxy) {
    super(injector);
   }

  ngOnInit() {
    if(this._permissionChecker.isGranted("Pages.ThanTietNieu.Create")){
      this.isEditable = true;
      console.log(this.isEditable) 
    }
    let object = Object.fromEntries(new Map(this.Data.items.map(obj=>{
      return [obj.key, obj.value]
    })));
    this.thantietnieu1 = object as unknown as ThanTietNieu1ViewModel;
  }
  save(): void{
    var inputmat1s : CreateMedicationKeyResultDto[] = [];
    for (const key in this.thantietnieu1) {
      if (Object.prototype.hasOwnProperty.call(this.thantietnieu1, key)) {
        const element = this.thantietnieu1[key];
        if(key.startsWith("thantietnieu"))
        {
        inputmat1s.push(new CreateMedicationKeyResultDto({
          key: key,
          value:  element,
          group: "ThanTietNieu",
          certificateId: 'f4e1980b-40d9-49d5-9c59-7a364ced6253',
        }));  
        }      
      }
    }
    this.thanTietNieuServiceServiceProxy.createList(inputmat1s).subscribe(
      () => {
        
        this.notify.info(this.l('SavedSuccessfully.'));
      },
      
    );
  }
}
