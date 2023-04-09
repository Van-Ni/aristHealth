import { Component, Injector, Input, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CreateMedicationKeyResultDto, KhoaThanKinhServiceServiceProxy } from '@shared/service-proxies/service-proxies';
import { PermissionCheckerService } from 'abp-ng2-module';
interface ThanKinh1ViewModel {
  thankinh_text_noidung: string;
  thankinh_selectbox_phanloai: string;
  thankinh_text_thankinh_ketluan: string;
}
@Component({
  selector: 'app-than-kinh1',
  templateUrl: './than-kinh1.component.html',
  styleUrls: ['./than-kinh1.component.css']
})
export class ThanKinh1Component extends AppComponentBase  implements OnInit {
  thankinh1: ThanKinh1ViewModel;
  @Input() Data: any;
  keys = [""];
  isEditable= false;
  constructor( private _permissionChecker: PermissionCheckerService,private injector: Injector, private khoaThanKinhServiceServiceProxy: KhoaThanKinhServiceServiceProxy) {
     super(injector);
   }

  ngOnInit() {
    if(this._permissionChecker.isGranted("Pages.ThanKinh.Create")){
      this.isEditable = true;
      console.log(this.isEditable) 
    }
    let object = Object.fromEntries(new Map(this.Data.items.map(obj=>{
      return [obj.key, obj.value]
    })));
    this.thankinh1 = object as unknown as ThanKinh1ViewModel;
  }
  save(): void{
    var inputmat1s : CreateMedicationKeyResultDto[] = [];
    for (const key in this.thankinh1) {
      if (Object.prototype.hasOwnProperty.call(this.thankinh1, key)) {
        const element = this.thankinh1[key];
        inputmat1s.push(new CreateMedicationKeyResultDto({
          key: key,
          value:  element,
          group: "ThanKinh",
          certificateId: 'f4e1980b-40d9-49d5-9c59-7a364ced6253',
        }));        
      }
    }
    this.khoaThanKinhServiceServiceProxy.createList(inputmat1s).subscribe(
      () => {
        
        this.notify.info(this.l('SavedSuccessfully.'));
      },
      
    );
  }


}
