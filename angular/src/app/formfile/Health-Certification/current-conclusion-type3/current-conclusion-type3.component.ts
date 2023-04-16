import { Component, Injector, OnInit } from '@angular/core';
import { CertificateKeyValueComponentBase } from '@app/manager/base-certificate';
import { DataService } from '@app/services/data.service';
import { CertificateGroupStatusDto, ChanDoanHinhAnhServiceServiceProxy } from '@shared/service-proxies/service-proxies';
import { PermissionCheckerService } from 'abp-ng2-module';
interface KetLuan3ViewModel{
  ketluan_text_phanloai:string;
}
@Component({
  selector: 'app-current-conclusion-type3',
  templateUrl: './current-conclusion-type3.component.html',
  styleUrls: ['./current-conclusion-type3.component.css']
})
export class CurrentConclusionType3Component extends CertificateKeyValueComponentBase<KetLuan3ViewModel> implements OnInit {
  setViewModel(model: any) {
    let object = Object.fromEntries(new Map(model.items.map(obj=>{
      return [obj.key, obj.value]
    })));
    this.ketluan3 = object as unknown as KetLuan3ViewModel;
  }
  ketluan3: KetLuan3ViewModel;

  keys = [""];
  isEditable2= false;
  certificateId: string;
  certificateStatus: CertificateGroupStatusDto;
  status = false;
  constructor( private _permissionChecker: PermissionCheckerService,private dataservice: DataService,private injector: Injector,private ChanDoanHinhAnhServiceServiceProxy : ChanDoanHinhAnhServiceServiceProxy) {
    super(injector, dataservice)
    this.group = "ketluan";
   }

   ngOnInit() {
    super.ngOnInit();
    if(this._permissionChecker.isGranted("Pages.KetLuan.Create")){
      this.isEditable2 = true;
    }

  }
  save(): void{
    // var inputhohap2s : CreateMedicationKeyResultDto[] = [];
    // const item1 = new CreateMedicationKeyResultDto(
    //   {
    //     key: 'ketluan_text_phanloai',
    //     value:  this.ketluan3.ketluan_text_phanloai|| '',
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
