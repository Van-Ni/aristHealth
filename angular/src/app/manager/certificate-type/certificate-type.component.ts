import { Component, Injector } from '@angular/core';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { CertificateDtoPagedResultDto, CertificateTypeDto, CertificateTypeDtoPagedResultDto, CertificateTypeServiceServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';
import { CreateCertificateTypeComponent } from './create-certificate-type/create-certificate-type.component';
import { EditCertificateTypeComponent } from './edit-certificate-type/edit-certificate-type.component';
class CertificateTypeViewModel{
  id: number;
  price: number;
  name: string;
  filePath: string;
  fina
  lResult: string;
}
class PagedCertificatesRequestDto extends PagedRequestDto {
  keyword: string;
}

@Component({
  selector: 'app-certificate-type',
  templateUrl: './certificate-type.component.html',
  styleUrls: ['./certificate-type.component.css']
})
export class CertificateTypeComponent  extends PagedListingComponentBase<CertificateTypeDto> {
  certificateType: CertificateTypeDto[] = [];
  keyword = '';

  constructor(
    injector: Injector,
    private _certificatesTypeService: CertificateTypeServiceServiceProxy,
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

    this._certificatesTypeService
      .getAll("creationTime desc","",request.keyword, request.skipCount, request.maxResultCount)
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: CertificateTypeDtoPagedResultDto) => {
        this.certificateType = result.items;
        this.showPaging(result, pageNumber);
      });
  }

  delete(certificateType: CertificateTypeDto): void {
    abp.message.confirm(
      this.l('CertificateDeleteWarningMessage', certificateType.name),
      undefined,
      (result: boolean) => {
        if (result) {
          this._certificatesTypeService
            .delete(certificateType.id)
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

  createCertificateType(): void {
    this.showCreateOrEditCertificateDialog();
  }

  editCertificate(certificateType: CertificateTypeDto): void {
    this.showCreateOrEditCertificateDialog(certificateType.id);
  }

  showCreateOrEditCertificateDialog(id?: number): void {
    let createOrEditCertificateTypeDialog: BsModalRef;
    if (id==null) {
      createOrEditCertificateTypeDialog = this._modalService.show(
        CreateCertificateTypeComponent,
        {
          class: 'modal-lg',
        }
      );
    } else {
      createOrEditCertificateTypeDialog = this._modalService.show(
        EditCertificateTypeComponent,
        {
          class: 'modal-lg',
          initialState: {
            id: id,
          },
        }
      );
    }

    createOrEditCertificateTypeDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }
}
