import { Component, Injector, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IPagedResultDto, PagedRequestDto } from '@shared/paged-listing-component-base';
import { CertificateDtoPagedResultDto, CertificateServiceServiceProxy, PaymentStatus } from '@shared/service-proxies/service-proxies';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CreateCertificateComponent } from './create-certificate/create-certificate.component';
import { EditCertificateComponent } from './edit-certificate/edit-certificate.component';
import { finalize } from 'rxjs';
import { Status } from '@shared/service-proxies/service-proxies';
import { CertificateDto } from '@shared/service-proxies/service-proxies';
class CertificateViewModel{
  id: string;
  status: Status;
  paymentStatus: PaymentStatus;
  clientInfoId: number;
  clientInfo_Name: string;
  certificateTypeId: number;
  certificateType_Name: string;
  amountPaid: number;
  reason: string;

}
@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.css']
})
export class CertificateComponent  {

  dropdownOpen: boolean = false;
  id: string;
  certificates: IPagedResultDto<CertificateViewModel>;

  createCertificate(): void {
    this.showCreateOrEditEnterpriseDialog();
  }
  constructor(injector: Injector, private router: Router,private _modalService: BsModalService, private certificateServiceServiceProxy: CertificateServiceServiceProxy, private route: ActivatedRoute
  ) {
  }

  list=(request: PagedRequestDto, finishedCallback: Function)=>{
    this.certificateServiceServiceProxy
      .getAll("creationTime desc","", request.skipCount,  request.maxResultCount)
      .subscribe((result: CertificateDtoPagedResultDto) => {
        if(result ==null) return;
        this.certificates = {
          items: result.items.map(x => {
            const certificateViewModel = new CertificateViewModel();
            certificateViewModel.id = x.id;
            certificateViewModel.amountPaid = x.amountPaid;
            certificateViewModel.certificateType_Name = x.certificateType.name;
            certificateViewModel.clientInfo_Name = x.clientInfo.fullName;
            certificateViewModel.paymentStatus = x.paymentStatus;
            certificateViewModel.certificateTypeId = x.certificateTypeId;
            certificateViewModel.status = x.status;
            certificateViewModel.reason = x.reason;
            return certificateViewModel;
          }),
          totalCount: result.totalCount
        };
        finishedCallback(this.certificates);

      });
  }
  editEnterprise(enterprise: CertificateViewModel): void {
    this.showCreateOrEditEnterpriseDialog(enterprise.id);
  }
  showCreateOrEditEnterpriseDialog(id?: string): void {
    let createOrEditEnterpriseDialog: BsModalRef;
    if (!id) {
      createOrEditEnterpriseDialog = this._modalService.show(
        CreateCertificateComponent,
        {
          class: 'modal-lg',
        }
      );
    } else {
      createOrEditEnterpriseDialog = this._modalService.show(
        EditCertificateComponent,
        {
          class: 'modal-lg',
          initialState: {
            id: id,
          },
        }
      );
    }
  }
  onTableItemClick(entity: CertificateViewModel){
    this.showCreateOrEditEnterpriseDialog(entity.id);
  }
  onDeleteItemTable(entity: CertificateViewModel){
    console.log(entity.id)
    abp.message.confirm('DeleteWarningMessage',  entity.id,
    (result: boolean) => {
      console.log(entity.id);
      if (result) {
        this.certificateServiceServiceProxy
          .delete(entity.id)
          .pipe(
            finalize(() => {
              abp.notify.success("DeleteSuccess");
            })
          )
          .subscribe(() => {});
      }
    }

    );
  }
  onViewProfile(entity: CertificateViewModel)
  {
    console.log(entity)
  //this.router.navigate(['app/', entity.certificateTypeId, '/', entity.id]);
  console.log(this.router.navigate(['app/'+ entity.certificateTypeId+ '/'+ entity.id]))
  }
}
