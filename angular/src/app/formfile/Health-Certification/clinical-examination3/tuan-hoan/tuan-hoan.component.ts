import { Component, Injector, Input, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CreateMedicationKeyResultDto, TuanHoanServiceServiceProxy } from '@shared/service-proxies/service-proxies';
import { PermissionCheckerService } from 'abp-ng2-module';
interface TuanHoan1ViewModel {
  tuanhoan_selectbox_phanloai: string;
  tuanhoan_text_hohap_ketluan: string;
}
@Component({
  selector: 'app-tuan-hoan',
  templateUrl: './tuan-hoan.component.html',
  styleUrls: ['./tuan-hoan.component.css']
})
export class TuanHoanComponent extends AppComponentBase implements OnInit {
  tuanhoan1: TuanHoan1ViewModel;
  @Input() Data: any;
  keys = [""];
  isEditable= false;
  constructor( private _permissionChecker: PermissionCheckerService,private injector: Injector,private tuanHoanServiceServiceProxy: TuanHoanServiceServiceProxy) {
    super(injector);
   }

  ngOnInit() {
    if(this._permissionChecker.isGranted("Pages.TuanHoan.Create")){
      this.isEditable = true;
      console.log(this.isEditable) 
    }
    let object = Object.fromEntries(new Map(this.Data.items.map(obj=>{
      return [obj.key, obj.value]
    })));
    this.tuanhoan1 = object as unknown as TuanHoan1ViewModel;
  }
  save(): void{
    var inputmat1s : CreateMedicationKeyResultDto[] = [];
    for (const key in this.tuanhoan1) {
      if (Object.prototype.hasOwnProperty.call(this.tuanhoan1, key)) {
        const element = this.tuanhoan1[key];
        if(key.startsWith("tuanhoan"))
        {
        inputmat1s.push(new CreateMedicationKeyResultDto({
          key: key,
          value:  element,
          group: "TuanHoan",
          certificateId: 'f4e1980b-40d9-49d5-9c59-7a364ced6253',
        }));  
        }      
      }
    }
    this.tuanHoanServiceServiceProxy.createList(inputmat1s).subscribe(
      () => {
        
        this.notify.info(this.l('SavedSuccessfully.'));
      },
      
    );
  }
}
