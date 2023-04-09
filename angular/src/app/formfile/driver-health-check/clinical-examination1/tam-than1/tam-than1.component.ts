import { Component, Injector, Input, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CreateMedicationKeyResultDto, KhoaTamThanServiceServiceProxy } from '@shared/service-proxies/service-proxies';
import { PermissionCheckerService } from 'abp-ng2-module';
interface TamThan1ViewModel {
  tamthan_text_noidung: string;
  tamthan_selectbox_phanloai: string;
  tamthan_text_tamthan_ketluan: string;
}
@Component({
  selector: 'app-tam-than1',
  templateUrl: './tam-than1.component.html',
  styleUrls: ['./tam-than1.component.css']
})
export class TamThan1Component  extends AppComponentBase  implements OnInit {
  tamthan1: TamThan1ViewModel;
  @Input() Data: any;
  keys = [""];
  isEditable= false;
  constructor(private _permissionChecker: PermissionCheckerService,private injector: Injector, private khoaTamThanServiceServiceProxy: KhoaTamThanServiceServiceProxy) {
    super(injector)
   }

   ngOnInit() {
    if(this._permissionChecker.isGranted("Pages.TamThan.Create")){
      this.isEditable = true;
      console.log(this.isEditable) 
    }
    let object = Object.fromEntries(new Map(this.Data.items.map(obj=>{
      return [obj.key, obj.value]
    })));
    this.tamthan1 = object as unknown as TamThan1ViewModel;
  }
  save(): void{
    var inputmat1s : CreateMedicationKeyResultDto[] = [];
    for (const key in this.tamthan1) {
      if (Object.prototype.hasOwnProperty.call(this.tamthan1, key)) {
        const element = this.tamthan1[key];
        inputmat1s.push(new CreateMedicationKeyResultDto({
          key: key,
          value:  element,
          group: "TamThan",
          certificateId: 'f4e1980b-40d9-49d5-9c59-7a364ced6253',
        }));        
      }
    }
    this.khoaTamThanServiceServiceProxy.createList(inputmat1s).subscribe(
      () => {
        
        this.notify.info(this.l('SavedSuccessfully.'));
      },
      
    );
  }


}
