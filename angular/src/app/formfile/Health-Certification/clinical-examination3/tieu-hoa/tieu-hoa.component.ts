import { Component, Injector, Input, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CreateMedicationKeyResultDto, TieuHoaServiceServiceProxy } from '@shared/service-proxies/service-proxies';
import { PermissionCheckerService } from 'abp-ng2-module';
interface TieuHoa1ViewModel {
  tieuhoa_selectbox_phanloai: string;
  tieuhoa_text_hohap_ketluan: string;
}
@Component({
  selector: 'app-tieu-hoa',
  templateUrl: './tieu-hoa.component.html',
  styleUrls: ['./tieu-hoa.component.css']
})
export class TieuHoaComponent extends AppComponentBase implements OnInit {
  tieuhoa1: TieuHoa1ViewModel;
  @Input() Data: any;
  keys = [""];
  isEditable= false;
  constructor( private _permissionChecker: PermissionCheckerService,private injector: Injector,private tieuHoaServiceServiceProxy: TieuHoaServiceServiceProxy) {
    super(injector);
   }

  ngOnInit() {
    if(this._permissionChecker.isGranted("Pages.TieuHoa.Create")){
      this.isEditable = true;
      console.log(this.isEditable) 
    }
    let object = Object.fromEntries(new Map(this.Data.items.map(obj=>{
      return [obj.key, obj.value]
    })));
    this.tieuhoa1 = object as unknown as TieuHoa1ViewModel;
  }
  save(): void{
    var inputmat1s : CreateMedicationKeyResultDto[] = [];
    for (const key in this.tieuhoa1) {
      if (Object.prototype.hasOwnProperty.call(this.tieuhoa1, key)) {
        const element = this.tieuhoa1[key];
        if(key.startsWith("tieuhoa"))
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
    this.tieuHoaServiceServiceProxy.createList(inputmat1s).subscribe(
      () => {
        
        this.notify.info(this.l('SavedSuccessfully.'));
      },
      
    );
  }
}
