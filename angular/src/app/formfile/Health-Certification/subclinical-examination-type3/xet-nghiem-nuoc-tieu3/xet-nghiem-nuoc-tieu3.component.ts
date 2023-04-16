import { Component, Injector, OnInit } from '@angular/core';
import { CertificateKeyValueComponentBase } from '@app/manager/base-certificate';
import { DataService } from '@app/services/data.service';
import { CertificateGroupStatusDto, XetNghiemNuocTieuServiceServiceProxy } from '@shared/service-proxies/service-proxies';
import { PermissionCheckerService } from 'abp-ng2-module';
interface XetNghiemNuocTieu3ViewModel{
  xetnghiemnuoctieu_text_duong: string;
  xetnghiemnuoctieu_text_protein: string;
  xetnghiemnuoctieu_text_khac: string;
}
@Component({
  selector: 'app-xet-nghiem-nuoc-tieu3',
  templateUrl: './xet-nghiem-nuoc-tieu3.component.html',
  styleUrls: ['./xet-nghiem-nuoc-tieu3.component.css']
})
export class XetNghiemNuocTieu3Component extends CertificateKeyValueComponentBase<XetNghiemNuocTieu3ViewModel> implements OnInit {
  setViewModel(model: any) {
    let object = Object.fromEntries(new Map(model.items.map(obj=>{
      return [obj.key, obj.value]
    })));
    this.xetnghiemnuoctieu3 = object as unknown as XetNghiemNuocTieu3ViewModel;
  }
  xetnghiemnuoctieu3: XetNghiemNuocTieu3ViewModel;
  keys = [""];
  isEditable2= false;
  certificateId: string;
  certificateStatus: CertificateGroupStatusDto;
  status = false;
  constructor( private _permissionChecker: PermissionCheckerService,private dataservice: DataService,private injector: Injector,private XetNghiemNuocTieuServiceServiceProxy: XetNghiemNuocTieuServiceServiceProxy) {
    super(injector, dataservice)
    this.group = "xetnghiemnuoctieu";
   }

   ngOnInit() {
    super.ngOnInit();
    if(this._permissionChecker.isGranted("Pages.XetNghiemNuocTieu.Create")){
      this.isEditable2 = true;
    }

  }
  save(): void{
    // var inputhohap2s : CreateMedicationKeyResultDto[] = [];
    // const item1 = new CreateMedicationKeyResultDto(
    //   {
    //     key: 'xetnghiemnuoctieu_text_duong',
    //     value:  this.xetnghiemnuoctieu3.xetnghiemnuoctieu_text_duong|| '',
    //     certificateId: this.certificateId,  
    //     group: this.group,
    //   }
    // );const item2 = new CreateMedicationKeyResultDto(
    //   {
    //     key: 'xetnghiemnuoctieu_text_khac',
    //     value:  this.xetnghiemnuoctieu3.xetnghiemnuoctieu_text_khac|| '',
    //     certificateId: this.certificateId,
    //     group: this.group,
    //   }
    // );const item3 = new CreateMedicationKeyResultDto(
    //   {
    //     key: 'xetnghiemnuoctieu_text_protein',
    //     value:  this.xetnghiemnuoctieu3.xetnghiemnuoctieu_text_protein|| '',
    //     certificateId: this.certificateId,
    //     group: this.group,
    //   }
    // );
    // inputhohap2s.push(item1);
    // inputhohap2s.push(item2);
    // inputhohap2s.push(item3);
    // if(this.status == true){
    //   this.XetNghiemNuocTieuServiceServiceProxy.updateOrInsert(inputhohap2s).subscribe(
    //     () => {
    //       this.notify.info(this.l('SavedSuccessfully.'));
    //       this.dataservice.refreshData(this.certificateId);
    //     },
    //   );
    // }else{
    //   this.XetNghiemNuocTieuServiceServiceProxy.createList(inputhohap2s).subscribe(
    //     () => {
    //       this.notify.info(this.l('SavedSuccessfully.'));
    //       this.dataservice.refreshData(this.certificateId);
    //     },
    //   );
    // }
  }
}
