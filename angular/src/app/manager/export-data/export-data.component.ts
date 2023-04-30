import { Component, Injector, OnInit } from '@angular/core';
import * as moment from 'moment';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import * as serviceProxies from "@shared/service-proxies/service-proxies";
import { PagedRequestDto, PagedListingComponentBase } from '@shared/paged-listing-component-base';
import { finalize } from 'rxjs';
import { HistoryExportDto } from '@shared/service-proxies/service-proxies';
import { CreateExportComponent } from './create-export/create-export.component';
class PagedHistoryExportRequestDto extends PagedRequestDto {
  keyword: string;
  filter: string;
}
@Component({
  selector: 'app-export-data',
  templateUrl: './export-data.component.html',
  styleUrls: ['./export-data.component.css']
})
export class ExportDataComponent 
extends PagedListingComponentBase<serviceProxies.HistoryExportDto>
implements OnInit
{
  protected delete(entity: serviceProxies.HistoryExportDto): void {
    throw new Error('Method not implemented.');
  }
historyExport:HistoryExportDto[] = [];
keyword = "";
dateFrom = new Date();
dateTo = new Date();
status :number;
filter = "";
constructor(
  injector: Injector,
  private historyExportService: serviceProxies.HistoryExportServiceServiceProxy,
  private _certificatesService: serviceProxies.CertificateServiceServiceProxy,
  private _modalService: BsModalService,
) {
  super(injector);

}

list(
  request: PagedHistoryExportRequestDto,
  pageNumber: number,
  finishedCallback: Function
): void {
  request.keyword = this.keyword;
  this.filter = request.filter;
  this.historyExportService
    .getAll(
      "creationTime desc",
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
    .subscribe((result: serviceProxies.HistoryExportDtoPagedResultDto) => {
      this.historyExport = result.items;
      this.showPaging(result, pageNumber);
      console.log(this.historyExport);
    });
}
createHistory(): void {
  this.showCreateHistoryExportDialog();
}
showCreateHistoryExportDialog(id?: string): void {
  let createOrEditCertificateDialog: BsModalRef;
  if (id == undefined) {
    createOrEditCertificateDialog = this._modalService.show(
      CreateExportComponent,
      {
        class: "modal-lg",
      }
    );
  }

  setTimeout(() => {
    if (createOrEditCertificateDialog.content) {
      createOrEditCertificateDialog.content.onSave.subscribe(() => {
        this.refresh();
      });
    }
  }, 100);
}
downloadFilePath(file: any){
  this.historyExportService.downloadFilePath(file).subscribe(
    (response: any) => {
      console.log(response);

      if (response) {
        // Check if the response body is not null or undefined
        const url = URL.createObjectURL(response);
        const link = document.createElement("a");
        link.href = url;
        link.download = "BaoCao.xlsx";
        link.target = "_blank";
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
getDateFrom(datestart: any) {
  const request = new PagedHistoryExportRequestDto();
  this.dateFrom = datestart;
  this.list(request, this.pageNumber, () => {});
}
getDateTo(dateend: any) {
  const request = new PagedHistoryExportRequestDto();
  this.dateTo = dateend;
  this.list(request, this.pageNumber, () => {});
}
getBegin = (date: Date) =>
  moment(new Date(date.getFullYear(), date.getMonth(), date.getDate()));
getEnd = (date: Date) =>
  moment(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1));
}
