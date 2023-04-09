import { Component, Injector, Input, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CreateMedicationKeyResultDto, KhoaTaiMuiHongServiceServiceProxy } from '@shared/service-proxies/service-proxies';
import { PermissionCheckerService } from 'abp-ng2-module';
interface TaiMuHong1ViewModel {
  taimuihong_text_taitrai:string;
  taimuihong_text_taiphai:string;
  taimuihong_text_taitrai_noitham:string;
  taimuihong_text_taiphai_noitham:string;
  taimuihong_text_noidung: string;
  taimuihong_selectbox_phanloai: string;
  taimuihong_text_taimuihong_ketluan: string;
}
@Component({
  selector: 'app-tai-mui-hong1',
  templateUrl: './tai-mui-hong1.component.html',
  styleUrls: ['./tai-mui-hong1.component.css']
})
export class TaiMuiHong1Component  extends AppComponentBase  implements OnInit {
  taimuihong1: TaiMuHong1ViewModel;
  @Input() Data: any;
  keys = [""];
  isEditable= false;
  constructor(private _permissionChecker: PermissionCheckerService,private injector: Injector, private khoaTaiMuiHongServiceServiceProxy: KhoaTaiMuiHongServiceServiceProxy) { 
    super(injector)
  }

  ngOnInit() {
    if(this._permissionChecker.isGranted("Pages.TaiMuiHong.Create")){
      this.isEditable = true;
      console.log(this.isEditable) 
    }
    let object = Object.fromEntries(new Map(this.Data.items.map(obj=>{
      return [obj.key, obj.value]
    })));
    this.taimuihong1 = object as unknown as TaiMuHong1ViewModel;
  }
  save(): void{
    var inputmat1s : CreateMedicationKeyResultDto[] = [];
    for (const key in this.taimuihong1) {
      if (Object.prototype.hasOwnProperty.call(this.taimuihong1, key)) {
        const element = this.taimuihong1[key];
        inputmat1s.push(new CreateMedicationKeyResultDto({
          key: key,
          value:  element,
          group: "TaiMuiHong",
          certificateId: 'f4e1980b-40d9-49d5-9c59-7a364ced6253',
        }));        
      }
    }
    this.khoaTaiMuiHongServiceServiceProxy.createList(inputmat1s).subscribe(
      () => {
        
        this.notify.info(this.l('SavedSuccessfully.'));
      },
      
    );
  }


}
