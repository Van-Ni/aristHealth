import { Component, Injector, Input, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CreateMedicationKeyResultDto, KhoaDalieuServiceServiceProxy } from '@shared/service-proxies/service-proxies';
import { PermissionCheckerService } from 'abp-ng2-module';
interface DaLieu1ViewModel {
  dalieu_selectbox_phanloai: string;
  dalieu_text_hohap_ketluan: string;
}
@Component({
  selector: 'app-da-lieu',
  templateUrl: './da-lieu.component.html',
  styleUrls: ['./da-lieu.component.css']
})
export class DaLieuComponent extends AppComponentBase implements OnInit {
  dalieu1: DaLieu1ViewModel;
  @Input() Data: any;
  keys = [""];
  isEditable= false;
  constructor( private _permissionChecker: PermissionCheckerService,private injector: Injector,private khoaDalieuServiceServiceProxy: KhoaDalieuServiceServiceProxy) {
    super(injector);
   }

  ngOnInit() {
    if(this._permissionChecker.isGranted("Pages.DaLieu.Create")){
      this.isEditable = true;
      console.log(this.isEditable) 
    }
    let object = Object.fromEntries(new Map(this.Data.items.map(obj=>{
      return [obj.key, obj.value]
    })));
    this.dalieu1 = object as unknown as DaLieu1ViewModel;
  }
  save(): void{
    var inputmat1s : CreateMedicationKeyResultDto[] = [];
    for (const key in this.dalieu1) {
      if (Object.prototype.hasOwnProperty.call(this.dalieu1, key)) {
        const element = this.dalieu1[key];
        if(key.startsWith("dalieu"))
        {
        inputmat1s.push(new CreateMedicationKeyResultDto({
          key: key,
          value:  element,
          group: "DaLieu",
          certificateId: 'f4e1980b-40d9-49d5-9c59-7a364ced6253',
        }));  
        }      
      }
    }
    this.khoaDalieuServiceServiceProxy.createList(inputmat1s).subscribe(
      () => {
        
        this.notify.info(this.l('SavedSuccessfully.'));
      },
      
    );
  }
}
