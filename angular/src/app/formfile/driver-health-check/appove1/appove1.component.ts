import { Component, Injector, OnInit } from '@angular/core';
import { CertificateKeyValueComponentBase } from '@app/manager/base-certificate';
import { DataService } from '@app/services/data.service';
import { CertificateGroupStatusDto, CertificateGroupStatusServiceServiceProxy, CreateCertificateGroupStatusDto, CreateMedicationKeyResultDto, TruongDonViKySoServiceServiceProxy } from '@shared/service-proxies/service-proxies';
import { AbpSessionService, PermissionCheckerService } from 'abp-ng2-module';
interface Approve1ViewModel {
  hohap_selectbox_phanloai: string;
  tbv: string;
}
@Component({
  selector: 'app-appove1',
  templateUrl: './appove1.component.html',
  styleUrls: ['./appove1.component.css']
})
export class Appove1Component extends CertificateKeyValueComponentBase<Approve1ViewModel> implements OnInit {
  setViewModel(model: any) {
    throw new Error('Method not implemented.');
  }
  isEditable2= false;
  certificateId: string;
  certificateStatus: CertificateGroupStatusDto;
  status = false;
  approve1: Approve1ViewModel;
  
  constructor( private _permissionChecker: PermissionCheckerService,private dataservice: DataService,private injector: Injector,private certificateGroupStatusServiceServiceProxy: CertificateGroupStatusServiceServiceProxy) {
    super(injector, dataservice)
    this.group = "tdv";
   }
  

  ngOnInit() {
    super.ngOnInit();
    if(this._permissionChecker.isGranted("Pages.TruongDonViKySo.Create")){
      this.isEditable2 = true;
    }
  }
  approve() : void {
      const item2 = new CreateCertificateGroupStatusDto(
      {
        userId: this.appSession.userId,
        certificateId: this.certificateId,
        group: this.group,
        status: true,
      }
    );
    
    if(this.status == false){
      this.certificateGroupStatusServiceServiceProxy.create(item2).subscribe(
        () => {
          this.notify.info(this.l('SavedSuccessfully.'));
          this.dataservice.refreshData(this.certificateId);
        },
      );
    }
    else{
      console.log("error");
    }
    
  }
}