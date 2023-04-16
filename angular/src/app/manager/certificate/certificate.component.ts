import { Component, Injector } from '@angular/core';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
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
class PagedCertificatesRequestDto extends PagedRequestDto {
  keyword: string;
}

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.css']
})
export class CertificateComponent  extends PagedListingComponentBase<CertificateDto> {
  Certificates: CertificateDto[] = [];
  keyword = '';

  constructor(
    injector: Injector,
    private _certificatesService: CertificateServiceServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector);
  }

  list(
    request: PagedCertificatesRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.keyword;

    this._certificatesService
      .getAll("creationTime desc","",request.keyword, request.skipCount, request.maxResultCount)
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: CertificateDtoPagedResultDto) => {
        this.Certificates = result.items;
        this.showPaging(result, pageNumber);
      });
  }

  delete(Certificate: CertificateDto): void {
    abp.message.confirm(
      this.l('CertificateDeleteWarningMessage', Certificate.clientInfo.fullName),
      undefined,
      (result: boolean) => {
        if (result) {
          this._certificatesService
            .delete(Certificate.id)
            .pipe(
              finalize(() => {
                abp.notify.success(this.l('SuccessfullyDeleted'));
                this.refresh();
              })
            )
            .subscribe(() => {});
        }
      }
    );
  }

  createCertificate(): void {
    this.showCreateOrEditCertificateDialog();
  }

  editCertificate(Certificate: CertificateDto): void {
    this.showCreateOrEditCertificateDialog(Certificate.id);
  }

  showCreateOrEditCertificateDialog(id?: string): void {
    let createOrEditCertificateDialog: BsModalRef;
    if (id==null) {
      createOrEditCertificateDialog = this._modalService.show(
        CreateCertificateComponent,
        {
          class: 'modal-lg',
        }
      );
    } else {
      createOrEditCertificateDialog = this._modalService.show(
        EditCertificateComponent,
        {
          class: 'modal-lg',
          initialState: {
            id: id,
          },
        }
      );
    }

    createOrEditCertificateDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }
}
