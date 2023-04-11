import { Component, Injector, Input, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CreateMedicationKeyResultDto, KhoaCoXuongKhopServiceServiceProxy } from '@shared/service-proxies/service-proxies';
import { PermissionCheckerService } from 'abp-ng2-module';
import { startWith } from 'rxjs';
interface CoXuongKhop1ViewModel {
  coxuongkhop_selectbox_phanloai: string ;
  coxuongkhop_text_coxuongkhop_ketluan: string ;
}
@Component({
  selector: 'app-co-xuong-khop1',
  templateUrl: './co-xuong-khop1.component.html',
  styleUrls: ['./co-xuong-khop1.component.css']
})
export class CoXuongKhop1Component  extends AppComponentBase  implements OnInit {
  coxuongkhop1: CoXuongKhop1ViewModel;
  @Input() Data: any;
  @Input() statusDataCheck: any;
  keys = [""];
  isEditable= false;
  constructor(private _permissionChecker: PermissionCheckerService,private injector: Injector, private khoaCoXuongKhopServiceServiceProxy: KhoaCoXuongKhopServiceServiceProxy) {
    super(injector)
   }

   ngOnInit() {
    if(this._permissionChecker.isGranted("Pages.CoXuongKhop.Create")){
      this.isEditable = true;
      console.log(this.isEditable) 
    }
    let object = Object.fromEntries(new Map(this.Data.items.map(obj=>{
      return [obj.key, obj.value]
    })));
    this.coxuongkhop1 = object as unknown as CoXuongKhop1ViewModel;
  }
  save(): void{
    var inputcoxuongkhop1s : CreateMedicationKeyResultDto[] = [];
    for (const key in this.coxuongkhop1) {
      if (Object.prototype.hasOwnProperty.call(this.coxuongkhop1, key)) {
        const element = this.coxuongkhop1[key];
        if(key.startsWith("coxuongkhop"))
        {
          inputcoxuongkhop1s.push(new CreateMedicationKeyResultDto({
            key: key,
            value:  element || '',
            group: "CoXuongKhop",
            certificateId: 'f4e1980b-40d9-49d5-9c59-7a364ced6253',
          }));    
        }    
      }
    }
    this.khoaCoXuongKhopServiceServiceProxy.createList(inputcoxuongkhop1s).subscribe(
      () => {
        
        this.notify.info(this.l('SavedSuccessfully.'));
      },
      
    );
  }
}
