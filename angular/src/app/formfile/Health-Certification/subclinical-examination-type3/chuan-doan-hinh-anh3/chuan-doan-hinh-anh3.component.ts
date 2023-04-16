import { Component, Injector, OnInit } from '@angular/core';
import { CertificateKeyValueComponentBase } from '@app/manager/base-certificate';
import { DataService } from '@app/services/data.service';
import { CertificateGroupStatusDto, ChanDoanHinhAnhServiceServiceProxy } from '@shared/service-proxies/service-proxies';
import { PermissionCheckerService } from 'abp-ng2-module';
interface ChanDoanHinhAnh3ViewModel{
  chandoanhinhanh_text_ketluan:string;
}
@Component({
  selector: 'app-chuan-doan-hinh-anh3',
  templateUrl: './chuan-doan-hinh-anh3.component.html',
  styleUrls: ['./chuan-doan-hinh-anh3.component.css']
})
export class ChuanDoanHinhAnh3Component extends CertificateKeyValueComponentBase<ChanDoanHinhAnh3ViewModel> implements OnInit {
  setViewModel(model: any) {
    let object = Object.fromEntries(new Map(model.items.map(obj=>{
      return [obj.key, obj.value]
    })));
    this.chuandoanhinhanh3 = object as unknown as ChanDoanHinhAnh3ViewModel;
  }
  chuandoanhinhanh3: ChanDoanHinhAnh3ViewModel;

  keys = [""];
  isEditable2= false;
  certificateId: string;
  certificateStatus: CertificateGroupStatusDto;
  status = false;
  constructor( private _permissionChecker: PermissionCheckerService,private dataservice: DataService,private injector: Injector,private ChanDoanHinhAnhServiceServiceProxy : ChanDoanHinhAnhServiceServiceProxy) {
    super(injector, dataservice)
    this.group = "chandoanhinhanh";
   }

   ngOnInit() {
    super.ngOnInit();
    if(this._permissionChecker.isGranted("Pages.ChanDoanHinhAnh.Create")){
      this.isEditable2 = true;
    }

  }
  save(): void{
    // var inputhohap2s : CreateMedicationKeyResultDto[] = [];
    // const item1 = new CreateMedicationKeyResultDto(
    //   {
    //     key: 'chandoanhinhanh_text_ketluan',
    //     value:  this.chuandoanhinhanh3.chandoanhinhanh_text_ketluan|| '',
    //     certificateId: this.certificateId,  
    //     group: this.group,
    //   }
    // );
    // inputhohap2s.push(item1);

    // if(this.status == true){
    //   this.ChanDoanHinhAnhServiceServiceProxy.updateOrInsert(inputhohap2s).subscribe(
    //     () => {
    //       this.notify.info(this.l('SavedSuccessfully.'));
    //       this.dataservice.refreshData(this.certificateId);
    //     },
    //   );
    // }else{
    //   this.ChanDoanHinhAnhServiceServiceProxy.createList(inputhohap2s).subscribe(
    //     () => {
    //       this.notify.info(this.l('SavedSuccessfully.'));
    //       this.dataservice.refreshData(this.certificateId);
    //     },
    //   );
    // }
  }
}
