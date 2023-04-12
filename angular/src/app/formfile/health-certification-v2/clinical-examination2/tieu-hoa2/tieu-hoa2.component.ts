import { Component, Injector, Input, OnInit } from '@angular/core';
import { DataService } from '@app/services/data.service';
import { AppComponentBase } from '@shared/app-component-base';
import { CertificateGroupStatusDto, CreateMedicationKeyResultDto, TieuHoaServiceServiceProxy } from '@shared/service-proxies/service-proxies';
import { PermissionCheckerService } from 'abp-ng2-module';
interface TieuHoa2ViewModel {
  tieuhoa_selectbox_phanloai: string;
  tieuhoa_text_tieuhoa_noidung: string;
}
@Component({
  selector: 'app-tieu-hoa2',
  templateUrl: './tieu-hoa2.component.html',
  styleUrls: ['./tieu-hoa2.component.css']
})
export class TieuHoa2Component extends AppComponentBase implements OnInit {
  tieuhoa2: TieuHoa2ViewModel;
  @Input() Data: any;
  @Input() statusDataCheck: any;
  keys = [""];
  isEditable2= false;
  certificateId: string;
  certificateStatus: CertificateGroupStatusDto;
  status = false;
  notify: any;
  constructor( private _permissionChecker: PermissionCheckerService,private dataservice: DataService,private injector: Injector,private tieuHoaServiceServiceProxy: TieuHoaServiceServiceProxy) {
    super(injector);
   }

  ngOnInit() {
    for (const item of this.statusDataCheck.items) {
      if(item.group == "TieuHoa")
      {
        this.status = true;
      }
    }
    this.certificateId = this.dataservice.getData();
    if(this._permissionChecker.isGranted("Pages.TieuHoa.Create")){
      this.isEditable2 = true;
    }
    let object = Object.fromEntries(new Map(this.Data.items.map(obj=>{
      return [obj.key, obj.value]
    })));
    this.tieuhoa2 = object as unknown as TieuHoa2ViewModel;
  }
  save(): void{
    var inputhohap2s : CreateMedicationKeyResultDto[] = [];
    const item1 = new CreateMedicationKeyResultDto(
      {
        key: 'tieuhoa_selectbox_phanloai',
        value:  this.tieuhoa2.tieuhoa_selectbox_phanloai|| '',
        certificateId: this.certificateId,  
        group: "TieuHoa",
      }
    );const item2 = new CreateMedicationKeyResultDto(
      {
        key: 'tieuhoa_text_tieuhoa_noidung',
        value:  this.tieuhoa2.tieuhoa_text_tieuhoa_noidung|| '',
        certificateId: this.certificateId,
        group: "TieuHoa",
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
