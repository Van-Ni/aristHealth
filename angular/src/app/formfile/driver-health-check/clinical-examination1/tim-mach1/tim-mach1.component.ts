import { Component, Injector, Input, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CreateMedicationKeyResultDto, KhoaTimMachServiceServiceProxy } from '@shared/service-proxies/service-proxies';
import { PermissionCheckerService } from 'abp-ng2-module';
interface TimMach1ViewModel {
  timmach_text_noidung: string;
  timmach_text_mach: string;
  timmach_text_huyetap: string;
  timmach_selectbox_phanloai: string;
  timmach_text_timmach_ketluan: string;
}
@Component({
  selector: 'app-tim-mach1',
  templateUrl: './tim-mach1.component.html',
  styleUrls: ['./tim-mach1.component.css']
})
export class TimMach1Component  extends AppComponentBase implements OnInit {
  timmach1: TimMach1ViewModel;
  @Input() statusDataCheck: any;
  @Input() Data: any;
  keys = [""];
  isEditable= false;
  constructor( private _permissionChecker: PermissionCheckerService,private injector: Injector, private khoaTimMachServiceServiceProxy: KhoaTimMachServiceServiceProxy) { 
    super(injector)
  }

  ngOnInit() {
    if(this._permissionChecker.isGranted("Pages.TimMach.Create")){
      this.isEditable = true;
      console.log(this.isEditable) 
    }
    let object = Object.fromEntries(new Map(this.Data.items.map(obj=>{
      return [obj.key, obj.value]
    })));
    this.timmach1 = object as unknown as TimMach1ViewModel;
  }
  save(): void{
    var inputmat1s : CreateMedicationKeyResultDto[] = [];
    for (const key in this.timmach1) {
      if (Object.prototype.hasOwnProperty.call(this.timmach1, key)) {
        const element = this.timmach1[key];
        inputmat1s.push(new CreateMedicationKeyResultDto({
          key: key,
          value:  element,
          group: "TimMach",
          certificateId: 'f4e1980b-40d9-49d5-9c59-7a364ced6253',
        }));        
      }
    }
    this.khoaTimMachServiceServiceProxy.createList(inputmat1s).subscribe(
      () => {
        
        this.notify.info(this.l('SavedSuccessfully.'));
      },
      
    );
  }

}
