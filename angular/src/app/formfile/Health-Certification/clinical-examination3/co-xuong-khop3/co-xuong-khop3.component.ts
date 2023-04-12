import { Component, Injector, Input, OnInit } from '@angular/core';
import { DataService } from '@app/services/data.service';
import { AppComponentBase } from '@shared/app-component-base';
import { CertificateGroupStatusDto, CreateMedicationKeyResultDto, KhoaCoXuongKhopServiceServiceProxy } from '@shared/service-proxies/service-proxies';
import { PermissionCheckerService } from 'abp-ng2-module';
interface CoXuongKhop3ViewModel {
  coxuongkhop_selectbox_phanloai: string;
  coxuongkhop_text_coxuongkhop_noidung: string;
}
@Component({
  selector: 'app-co-xuong-khop3',
  templateUrl: './co-xuong-khop3.component.html',
  styleUrls: ['./co-xuong-khop3.component.css']
})
export class CoXuongKhop3Component  extends AppComponentBase implements OnInit {
  coxuongkhop3: CoXuongKhop3ViewModel;
  @Input() Data: any;
  keys = [""];
  isEditable= false;
  @Input() statusDataCheck: any;
  certificateId: string;
  certificateStatus: CertificateGroupStatusDto;
  status = false;
  notify: any;
  constructor( private _permissionChecker: PermissionCheckerService,private dataservice: DataService,private injector: Injector,private KhoaCoXuongKhopServiceServiceProxy: KhoaCoXuongKhopServiceServiceProxy) {
    super(injector);
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
      this.isEditable = true;
    }
    let object = Object.fromEntries(new Map(this.Data.items.map(obj=>{
      return [obj.key, obj.value]
    })));
    this.coxuongkhop3 = object as unknown as CoXuongKhop3ViewModel;
  }
  save(): void{
    var inputhohap2s : CreateMedicationKeyResultDto[] = [];
    const item1 = new CreateMedicationKeyResultDto(
      {
        key: 'coxuongkhop_text_coxuongkhop_noidung',
        value:  this.coxuongkhop3.coxuongkhop_text_coxuongkhop_noidung|| '',
        certificateId: this.certificateId,  
        group: "CoXuongKhop",
      }
    );const item2 = new CreateMedicationKeyResultDto(
      {
        key: 'coxuongkhop_selectbox_phanloai',
        value:  this.coxuongkhop3.coxuongkhop_selectbox_phanloai|| '',
        certificateId: this.certificateId,
        group: "CoXuongKhop",
      }
    );
    inputhohap2s.push(item1);
    inputhohap2s.push(item2);
    if(this.status == true){
      this.KhoaCoXuongKhopServiceServiceProxy.updateOrInsert(inputhohap2s).subscribe(
        () => {
          this.notify.info(this.l('SavedSuccessfully.'));
        },
      );
    }else{
      this.KhoaCoXuongKhopServiceServiceProxy.createList(inputhohap2s).subscribe(
        () => {
          this.notify.info(this.l('SavedSuccessfully.'));
        },
      );
    }
  }
}
