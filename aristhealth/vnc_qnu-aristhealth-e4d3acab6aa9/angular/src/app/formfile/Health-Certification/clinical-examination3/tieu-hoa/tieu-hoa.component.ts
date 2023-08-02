import { Component, Injector, Input, OnInit } from '@angular/core';
import { DataService } from '@app/services/data.service';
import { AppComponentBase } from '@shared/app-component-base';
import { CertificateGroupStatusDto, CreateMedicationKeyResultDto, TieuHoaServiceServiceProxy } from '@shared/service-proxies/service-proxies';
import { PermissionCheckerService } from 'abp-ng2-module';
interface TieuHoa1ViewModel {
  tieuhoa_selectbox_phanloai: string;
  tieuhoa_text_tieuhoa_noidung: string;
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
  @Input() statusDataCheck: any;
  certificateId: string;
  certificateStatus: CertificateGroupStatusDto;
  status = false;
  notify: any;
  constructor( private _permissionChecker: PermissionCheckerService,private dataservice: DataService,private injector: Injector,private tieuHoaServiceServiceProxy: TieuHoaServiceServiceProxy) {
    super(injector);
   }

  ngOnInit() {
    for (const item of this.statusDataCheck.items) {
      if(item.group == "TuanHoan")
      {
        this.status = true;
      }
    }
    this.certificateId = this.dataservice.getData();
    if(this._permissionChecker.isGranted("Pages.TuanHoan.Create")){
      this.isEditable = true;
    }
    let object = Object.fromEntries(new Map(this.Data.items.map(obj=>{
      return [obj.key, obj.value]
    })));
    this.tieuhoa1 = object as unknown as TieuHoa1ViewModel;
  }
  save(): void{
    var inputhohap2s : CreateMedicationKeyResultDto[] = [];
    const item1 = new CreateMedicationKeyResultDto(
      {
        key: 'tieuhoa_selectbox_phanloai',
        value:  this.tieuhoa1.tieuhoa_selectbox_phanloai|| '',
        certificateId: this.certificateId,  
        group: "TuanHoan",
      }
    );const item2 = new CreateMedicationKeyResultDto(
      {
        key: 'tieuhoa_text_tieuhoa_noidung',
        value:  this.tieuhoa1.tieuhoa_text_tieuhoa_noidung|| '',
        certificateId: this.certificateId,
        group: "TuanHoan",
      }
    );
    inputhohap2s.push(item1);
    inputhohap2s.push(item2);
    if(this.status == true){
      this.tieuHoaServiceServiceProxy.updateOrInsert(inputhohap2s).subscribe(
        () => {
          this.notify.info(this.l('SavedSuccessfully.'));
        },
      );
    }else{
      this.tieuHoaServiceServiceProxy.createList(inputhohap2s).subscribe(
        () => {
          this.notify.info(this.l('SavedSuccessfully.'));
        },
      );
    }
  }
}
