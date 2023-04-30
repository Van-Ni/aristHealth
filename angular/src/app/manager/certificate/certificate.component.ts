import { Component, Injector, OnInit } from "@angular/core";
import {
  PagedListingComponentBase,
  PagedRequestDto,
} from "@shared/paged-listing-component-base";
import * as serviceProxies from "@shared/service-proxies/service-proxies";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { CreateCertificateComponent } from "./create-certificate/create-certificate.component";
import { EditCertificateComponent } from "./edit-certificate/edit-certificate.component";
import { finalize } from "rxjs";
import { CertificateDto } from "@shared/service-proxies/service-proxies";
import * as moment from "moment";
class PagedCertificatesRequestDto extends PagedRequestDto {
  keyword: string;
  filter: string;
}
export interface RegionDtlFull {
  id: string | undefined;
  name: string | undefined;
  childrent: RegionDtlFull[];
}

@Component({
  selector: "app-certificate",
  templateUrl: "./certificate.component.html",
  styleUrls: ["./certificate.component.css"],
})
export class CertificateComponent
  extends PagedListingComponentBase<CertificateDto>
  implements OnInit
{
  Certificates: CertificateDto[] = [];
  keyword = "";
  dateFrom = new Date();
  dateTo = new Date();
  filter = "creationTime desc";
  status: number;
  constructor(
    injector: Injector,
    private _certificatesService: serviceProxies.CertificateServiceServiceProxy,
    private _modalService: BsModalService,
    private PDFService: serviceProxies.PDFServiceServiceProxy
  ) {
    super(injector);
  }

  list(
    request: PagedCertificatesRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.keyword;
    this.filter = request.filter;
    this._certificatesService
      .getAll(
        this.filter,
        "",
        request.keyword,
        this.getBegin(this.dateFrom),
        this.getEnd(this.dateTo),
        request.skipCount,
        request.maxResultCount
      )
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: serviceProxies.CertificateDtoPagedResultDto) => {
        this.Certificates = result.items;
        this.showPaging(result, pageNumber);
        console.log(this.Certificates);
      });
  }
  getIncrease(): void {
    const request = new PagedCertificatesRequestDto();
    request.keyword = "certificate";
    request.filter = "status desc";
    console.log(request);

    this.list(request, this.pageNumber, () => {});
  }
  getReduce(): void {
    const request = new PagedCertificatesRequestDto();
    request.keyword = "certificate";
    request.filter = "status asc";
    console.log(request);

    this.list(request, this.pageNumber, () => {});
  }
  delete(Certificate: CertificateDto): void {
    abp.message.confirm(
      this.l(
        "CertificateDeleteWarningMessage",
        Certificate.clientInfo.fullName
      ),
      undefined,
      (result: boolean) => {
        if (result) {
          this._certificatesService
            .delete(Certificate.id)
            .pipe(
              finalize(() => {
                abp.notify.success(this.l("SuccessfullyDeleted"));
                this.refresh();
              })
            )
            .subscribe(() => {});
        }
      }
    );
  }
  print(Certificate: CertificateDto): void {
    this.PDFService.getCertificatePdfPrintedFile(Certificate.id).subscribe(
      (response: any) => {
        console.log(response);

        if (response) {
          // Check if the response body is not null or undefined
          //const blob = new Blob([response.body], { type: 'application/pdf' });
          const url = URL.createObjectURL(response);
          const link = document.createElement("a");
          link.href = url;
          link.download = Certificate.clientInfo.fullName.normalize("NFC").replace(/\p{Diacritic}/gu, "").replace(/ /g, '_'); +'.pdf';
          link.target = '_blank';
          link.click();
        } else {
          // Handle null or undefined response body
          console.error("Response body is null or undefined");
        }
      },
      (error) => {
        // Handle error
        console.error(error);
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
    if (id == undefined) {
      createOrEditCertificateDialog = this._modalService.show(
        CreateCertificateComponent,
        {
          class: "modal-lg",
        }
      );
    } else {
      createOrEditCertificateDialog = this._modalService.show(
        EditCertificateComponent,
        {
          class: "modal-lg",
          initialState: {
            id: id,
          },
        }
      );
    }

    if (createOrEditCertificateDialog.content) {
      createOrEditCertificateDialog.content.onSave.subscribe(() => {
        this.refresh();
      });
    }
  }
  getDateFrom(datestart: any) {
    const request = new PagedCertificatesRequestDto();
    this.dateFrom = datestart;
    this.list(request, this.pageNumber, () => {});
  }
  getDateTo(dateend: any) {
    const request = new PagedCertificatesRequestDto();
    this.dateTo = dateend;
    this.list(request, this.pageNumber, () => {});
  }
  getBegin = (date: Date) =>
    moment(new Date(date.getFullYear(), date.getMonth(), date.getDate()));
  getEnd = (date: Date) =>
    moment(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1));
}
