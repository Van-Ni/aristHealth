import { Component, Injector, Input, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CreateMedicationKeyResultDto, KhoaRangHamMatServiceServiceProxy } from '@shared/service-proxies/service-proxies';
import { PermissionCheckerService } from 'abp-ng2-module';
interface RamHamMat1ViewModel {
  ranghammat_text_hamtren:string;
  ranghammat_text_hamduoi:string;
  ranghammat_text_noidung: string;
  ranghammat_selectbox_phanloai: string;
  ranghammat_text_ranghammat_ketluan: string;
}
@Component({
  selector: 'app-rang-ham-mat',
  templateUrl: './rang-ham-mat.component.html',
  styleUrls: ['./rang-ham-mat.component.css']
})
export class RangHamMatComponent  extends AppComponentBase  implements OnInit {
  ranghammat1: RamHamMat1ViewModel;
  @Input() Data: any;
  keys = [""];
  isEditable= false;
  constructor(private _permissionChecker: PermissionCheckerService,private injector: Injector, private khoaRangHamMatServiceServiceProxy: KhoaRangHamMatServiceServiceProxy) { 
    super(injector)
  }

  ngOnInit() {
    if(this._permissionChecker.isGranted("Pages.RangHamMat.Create")){
      this.isEditable = true;
      console.log(this.isEditable) 
    }
    let object = Object.fromEntries(new Map(this.Data.items.map(obj=>{
      return [obj.key, obj.value]
    })));
    this.ranghammat1 = object as unknown as RamHamMat1ViewModel;
  }
  save(): void{
    var inputmat1s : CreateMedicationKeyResultDto[] = [];
    for (const key in this.ranghammat1) {
      if (Object.prototype.hasOwnProperty.call(this.ranghammat1, key)) {
        const element = this.ranghammat1[key];
        inputmat1s.push(new CreateMedicationKeyResultDto({
          key: key,
          value:  element,
          group: "RangHamMat",
          certificateId: 'f4e1980b-40d9-49d5-9c59-7a364ced6253',
        }));        
      }
    }
    this.khoaRangHamMatServiceServiceProxy.createList(inputmat1s).subscribe(
      () => {
        
        this.notify.info(this.l('SavedSuccessfully.'));
      },
      
    );
  }


}
