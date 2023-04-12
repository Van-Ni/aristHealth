import { Component, Injector, Input, OnInit } from '@angular/core';
import { CertificateKeyValueComponentBase } from '@app/manager/base-certificate';
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
export class TieuHoaComponent extends CertificateKeyValueComponentBase<TieuHoa1ViewModel> implements OnInit {
  setViewModel(model: any) {
    let object = Object.fromEntries(new Map(model.items.map(obj=>{
      return [obj.key, obj.value]
    })));
    this.tieuhoa1 = object as unknown as TieuHoa1ViewModel;
  }
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
    super(injector, dataservice)
    this.group = "tieuhoa";
   }

   ngOnInit() {
    super.ngOnInit();
    if(this._permissionChecker.isGranted("Pages.TieuHoa.Create")){
      this.isEditable = true;
    }

  }
  save(): void{
    var inputhohap2s : CreateMedicationKeyResultDto[] = [];
    const item1 = new CreateMedicationKeyResultDto(
      {
        key: 'tieuhoa_selectbox_phanloai',
        value:  this.tieuhoa1.tieuhoa_selectbox_phanloai|| '',
        certificateId: this.certificateId,  
        group: "tieuhoa",
      }
    );const item2 = new CreateMedicationKeyResultDto(
      {
        key: 'tieuhoa_text_tieuhoa_noidung',
        value:  this.tieuhoa1.tieuhoa_text_tieuhoa_noidung|| '',
        certificateId: this.certificateId,
        group: "tieuhoa",
      }
    );
    inputhohap2s.push(item1);
    inputhohap2s.push(item2);
    if(this.status == true){
      this.tieuHoaServiceServiceProxy.updateOrInsert(inputhohap2s).subscribe(
        () => {
          this.notify.info(this.l('SavedSuccessfully.'));
          this.dataservice.refreshData(this.certificateId);
        },
      );
    }else{
      this.tieuHoaServiceServiceProxy.createList(inputhohap2s).subscribe(
        () => {
          this.notify.info(this.l('SavedSuccessfully.'));
          this.dataservice.refreshData(this.certificateId);
        },
      );
    }
  }
}
