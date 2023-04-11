import { Component, Injector, Input, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CreateMedicationKeyResultDto, KhoaNgoaiKhoaServiceServiceProxy } from '@shared/service-proxies/service-proxies';
import { PermissionCheckerService } from 'abp-ng2-module';
interface NgoaiKhoa1ViewModel {
  ngoaikhoa_selectbox_phanloai: string;
  ngoaikhoa_text_hohap_ketluan: string;
}
@Component({
  selector: 'app-ngoai-khoa',
  templateUrl: './ngoai-khoa.component.html',
  styleUrls: ['./ngoai-khoa.component.css']
})
export class NgoaiKhoaComponent extends AppComponentBase implements OnInit {
  ngoaikhoa: NgoaiKhoa1ViewModel;
  @Input() Data: any;
  keys = [""];
  isEditable= false;
  constructor( private _permissionChecker: PermissionCheckerService,private injector: Injector,private khoaNgoaiKhoaServiceServiceProxy: KhoaNgoaiKhoaServiceServiceProxy) {
    super(injector);
   }

  ngOnInit() {
    if(this._permissionChecker.isGranted("Pages.NgoaiKhoa.Create")){
      this.isEditable = true;
      console.log(this.isEditable) 
    }
    let object = Object.fromEntries(new Map(this.Data.items.map(obj=>{
      return [obj.key, obj.value]
    })));
    this.ngoaikhoa = object as unknown as NgoaiKhoa1ViewModel;
  }
  save(): void{
    var inputmat1s : CreateMedicationKeyResultDto[] = [];
    for (const key in this.ngoaikhoa) {
      if (Object.prototype.hasOwnProperty.call(this.ngoaikhoa, key)) {
        const element = this.ngoaikhoa[key];
        if(key.startsWith("ngoaikhoa"))
        {
        inputmat1s.push(new CreateMedicationKeyResultDto({
          key: key,
          value:  element,
          group: "NgoaiKhoa",
          certificateId: 'f4e1980b-40d9-49d5-9c59-7a364ced6253',
        }));  
        }      
      }
    }
    this.khoaNgoaiKhoaServiceServiceProxy.createList(inputmat1s).subscribe(
      () => {
        
        this.notify.info(this.l('SavedSuccessfully.'));
      },
      
    );
  }
}
