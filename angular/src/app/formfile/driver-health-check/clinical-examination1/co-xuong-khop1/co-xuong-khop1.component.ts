import { Component, Injector, Input, OnInit } from '@angular/core';
import { DataService } from '@app/services/data.service';
import { AppComponentBase } from '@shared/app-component-base';
import { CertificateGroupStatusDto, CreateMedicationKeyResultDto, KhoaCoXuongKhopServiceServiceProxy } from '@shared/service-proxies/service-proxies';
import { PermissionCheckerService } from 'abp-ng2-module';
import { startWith } from 'rxjs';
interface CoXuongKhop1ViewModel {
  coxuongkhop_selectbox_phanloai: string ;
  coxuongkhop_text_coxuongkhop_ketluan: string ;
}
@Component({
  selector: 'app-co-xuong-khop1',
  templateUrl: './co-xuong-khop1.component.html',
  styleUrls: ['./co-xuong-khop1.component.css']
})
export class CoXuongKhop1Component  extends AppComponentBase  implements OnInit {
  coxuongkhop1: CoXuongKhop1ViewModel;
  @Input() Data: any;
  @Input() statusDataCheck: any;
  keys = [""];
  isEditable1= false;
  certificateId: string;
  certificateStatus: CertificateGroupStatusDto;
  status = false;
  constructor(private _permissionChecker: PermissionCheckerService,private dataservice: DataService,private injector: Injector, private khoaCoXuongKhopServiceServiceProxy: KhoaCoXuongKhopServiceServiceProxy) {
    super(injector)
   }

   ngOnInit() {
    for (const item of this.statusDataCheck.items) {
      if(item.group == "CoXuongKhop")
      {
        this.status = true;
      }
    }
    this.certificateId = this.dataservice.getData();
    if(this._permissionChecker.isGranted("Pages.CoXuongKhop.Create")){
      this.isEditable1 = true;
    }
    let object = Object.fromEntries(new Map(this.Data.items.map(obj=>{
      return [obj.key, obj.value]
    })));
    this.coxuongkhop1 = object as unknown as CoXuongKhop1ViewModel;
  }
  save(): void{
    var inputcoxuongkhop1s : CreateMedicationKeyResultDto[] = [];
    const item1 = new CreateMedicationKeyResultDto(
      {
        key: 'coxuongkhop_selectbox_phanloai',
        value:  this.coxuongkhop1.coxuongkhop_selectbox_phanloai|| '',
        certificateId: this.certificateId,  
        group: "CoXuongKhop",
      }
    );const item2 = new CreateMedicationKeyResultDto(
      {
        key: 'coxuongkhop_text_coxuongkhop_ketluan',
        value:  this.coxuongkhop1.coxuongkhop_text_coxuongkhop_ketluan|| '',
        certificateId: this.certificateId,
        group: "CoXuongKhop",
      }
    );
    inputcoxuongkhop1s.push(item1);
    inputcoxuongkhop1s.push(item2);
    if(this.status == true){
      this.khoaCoXuongKhopServiceServiceProxy.updateOrInsert(inputcoxuongkhop1s).subscribe(
        () => {
          this.notify.info(this.l('SavedSuccessfully.'));
        },
      );
    }else{
      this.khoaCoXuongKhopServiceServiceProxy.createList(inputcoxuongkhop1s).subscribe(
        () => {
          this.notify.info(this.l('SavedSuccessfully.'));
        },
      );
    }
  }
}
