import { Component, Injector, Input, OnInit } from '@angular/core';
import { DataService } from '@app/services/data.service';
import { AppComponentBase } from '@shared/app-component-base';
import { CertificateGroupStatusDto, CreateMedicationKeyResultDto, KhoaRangHamMatServiceServiceProxy } from '@shared/service-proxies/service-proxies';
import { PermissionCheckerService } from 'abp-ng2-module';
interface RamHamMat3ViewModel {
  ranghammat_text_hamtren:string;
  ranghammat_text_hamduoi:string;
  ranghammat_text_noidung: string;
  ranghammat_selectbox_phanloai: string;
}
@Component({
  selector: 'app-rang-ham-mat',
  templateUrl: './rang-ham-mat.component.html',
  styleUrls: ['./rang-ham-mat.component.css']
})
export class RangHamMatComponent  extends AppComponentBase implements OnInit {
  ranghammat3: RamHamMat3ViewModel;
  @Input() Data: any;
  keys = [""];
  isEditable= false;
  @Input() statusDataCheck: any;
  certificateId: string;
  certificateStatus: CertificateGroupStatusDto;
  status = false;
  notify: any;
  constructor( private _permissionChecker: PermissionCheckerService,private dataservice: DataService,private injector: Injector,private KhoaRangHamMatServiceServiceProxy: KhoaRangHamMatServiceServiceProxy) {
    super(injector);
   }

  ngOnInit() {
    for (const item of this.statusDataCheck.items) {
      if(item.group == "RangHamMat")
      {
        this.status = true;
      }
    }
    this.certificateId = this.dataservice.getData();
    if(this._permissionChecker.isGranted("Pages.RangHamMat.Create")){
      this.isEditable = true;
    }
    let object = Object.fromEntries(new Map(this.Data.items.map(obj=>{
      return [obj.key, obj.value]
    })));
    this.ranghammat3 = object as unknown as RamHamMat3ViewModel;
  }
  save(): void{
    var inputhohap2s : CreateMedicationKeyResultDto[] = [];
    const item1 = new CreateMedicationKeyResultDto(
      {
        key: 'ranghammat_selectbox_phanloai',
        value:  this.ranghammat3.ranghammat_selectbox_phanloai|| '',
        certificateId: this.certificateId,  
        group: "RangHamMat",
      }
    );const item3= new CreateMedicationKeyResultDto(
      {
        key: 'ranghammat_text_hamduoi',
        value:  this.ranghammat3.ranghammat_text_hamduoi|| '',
        certificateId: this.certificateId,
        group: "RangHamMat",
      }
    );const item4 = new CreateMedicationKeyResultDto(
      {
        key: 'ranghammat_text_hamtren',
        value:  this.ranghammat3.ranghammat_text_hamtren|| '',
        certificateId: this.certificateId,
        group: "RangHamMat",
      }
    );const item2 = new CreateMedicationKeyResultDto(
      {
        key: 'ranghammat_text_noidung',
        value:  this.ranghammat3.ranghammat_text_noidung|| '',
        certificateId: this.certificateId,
        group: "RangHamMat",
      }
    );
    inputhohap2s.push(item1);
    inputhohap2s.push(item2);
    inputhohap2s.push(item3);
    inputhohap2s.push(item4);
    if(this.status == true){
      this.KhoaRangHamMatServiceServiceProxy.updateOrInsert(inputhohap2s).subscribe(
        () => {
          this.notify.info(this.l('SavedSuccessfully.'));
        },
      );
    }else{
      this.KhoaRangHamMatServiceServiceProxy.createList(inputhohap2s).subscribe(
        () => {
          this.notify.info(this.l('SavedSuccessfully.'));
        },
      );
    }
  }
}
