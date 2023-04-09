import { Component, Injector, Input, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CreateMedicationKeyResultDto, KhoaNoiTietServiceServiceProxy } from '@shared/service-proxies/service-proxies';
import { PermissionCheckerService } from 'abp-ng2-module';
interface NoiTiet1ViewModel {
  noitiet_text_noidung: string;
  noitiet_selectbox_phanloai: string;
  noitiet_text_noitiet_ketluan: string;
}
@Component({
  selector: 'app-noi-tiet1',
  templateUrl: './noi-tiet1.component.html',
  styleUrls: ['./noi-tiet1.component.css']
})
export class NoiTiet1Component  extends AppComponentBase implements OnInit {
  noitiet1: NoiTiet1ViewModel;
  @Input() Data: any;
  keys = [""];
  isEditable= false;
  notify: any;
  constructor(private _permissionChecker: PermissionCheckerService,private injector: Injector, private khoaNoiTietServiceServiceProxy: KhoaNoiTietServiceServiceProxy) { 
    super(injector)
  }

  ngOnInit() {
    if(this._permissionChecker.isGranted("Pages.NoiTiet.Create")){
      this.isEditable = true;
      console.log(this.isEditable) 
    }
    let object = Object.fromEntries(new Map(this.Data.items.map(obj=>{
      return [obj.key, obj.value]
    })));
    this.noitiet1 = object as unknown as NoiTiet1ViewModel;
  }
  save(): void{
    var inputmat1s : CreateMedicationKeyResultDto[] = [];
    for (const key in this.noitiet1) {
      if (Object.prototype.hasOwnProperty.call(this.noitiet1, key)) {
        const element = this.noitiet1[key];
        inputmat1s.push(new CreateMedicationKeyResultDto({
          key: key,
          value:  element,
          group: "NoiTiet",
          certificateId: 'f4e1980b-40d9-49d5-9c59-7a364ced6253',
        }));        
      }
    }
    this.khoaNoiTietServiceServiceProxy.createList(inputmat1s).subscribe(
      () => {
        
        this.notify.info(this.l('SavedSuccessfully.'));
      },
      
    );
  }

}
