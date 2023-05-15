import { Component, Injector, OnInit } from "@angular/core";
import {
  PagedListingComponentBase,
  PagedRequestDto,
} from "@shared/paged-listing-component-base";
import { CertificateSyncDto } from "@shared/service-proxies/service-proxies";

import * as serviceProxies from "@shared/service-proxies/service-proxies";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { CertificateSyncDetailComponent } from "./certificate-sync-detail/certificate-sync-detail.component";
import * as moment from "moment";
export class PagedCertificatesSyncRequestDto extends PagedRequestDto {
  keyword: string;
  filter: serviceProxies.SyncStatus;
}
@Component({
  selector: "app-certificate-sync",
  templateUrl: "./certificate-sync.component.html",
  styleUrls: ["./certificate-sync.component.css"],
})
export class CertificateSyncComponent extends PagedListingComponentBase<CertificateSyncDto> {
  dateFrom = new Date();
  dateTo = new Date();
  filter = serviceProxies.SyncStatus._1;
  protected list(
    request: PagedCertificatesSyncRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    this._certificateSyncService
      .getAll("",
      this.getBegin(this.dateFrom),
      this.getEnd(this.dateTo),
      request.filter,
      request.skipCount,
      request.maxResultCount,)
      .subscribe((result) => {
        this.certificateSyncDtos = result.items;
        console.log(result.items);
        
        this.showPaging(result, pageNumber);
        finishedCallback();
      });
  }
  protected delete(entity: CertificateSyncDto): void {
    throw new Error("Method not implemented.");
  }
  /**
   *
   */
  certificateSyncDtos: CertificateSyncDto[] = [];
  constructor(
    injector: Injector,
    private _certificateSyncService: serviceProxies.SyncServiceServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector);
  }
  ViewSync(sync: CertificateSyncDto): void {
    this.showDialog(sync.id);
  }
  syncCertificate(sync: CertificateSyncDto): void {
    this._certificateSyncService.syncCertificate(sync.id).subscribe(r=>{
      abp.notify.success(this.l('Successfully'));
      this.refresh();
    });
  }
  showDialog(id?: number): void {
    let createOrEditSyncDialog: BsModalRef;
    if (id) {
      createOrEditSyncDialog = this._modalService.show(
        CertificateSyncDetailComponent,
        {
          class: 'modal-xl',
          initialState: {
            id: id
          }
        }
      );
    }

    // createOrEditSyncDialog.content.onSave.subscribe(() => {
    //   this.refresh();
    // });
  }
  getDateFrom(datestart: any) {
    const request = new PagedCertificatesSyncRequestDto();
    this.dateFrom = datestart;
    this.list(request, this.pageNumber, () => {});
  }
  getDateTo(dateend: any) {
    const request = new PagedCertificatesSyncRequestDto();
    this.dateTo = dateend;
    this.list(request, this.pageNumber, () => {});
  }
  getBegin = (date: Date) =>
    moment(new Date(date.getFullYear(), date.getMonth(), date.getDate()));
  getEnd = (date: Date) =>
    moment(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1));
  
  getInit()
  {
    const request = new PagedCertificatesSyncRequestDto();
    request.filter = serviceProxies.SyncStatus._0;
    this.list(request, this.pageNumber, () => {});
  }
  getDone()
  {
    const request = new PagedCertificatesSyncRequestDto();
    request.filter = serviceProxies.SyncStatus._1;
    this.list(request, this.pageNumber, () => {});
  }
  getFailed()
  {
    const request = new PagedCertificatesSyncRequestDto();
    request.filter = serviceProxies.SyncStatus._2;
    this.list(request, this.pageNumber, () => {});
  }
  getCancelled()
  {
    const request = new PagedCertificatesSyncRequestDto();
    request.filter = serviceProxies.SyncStatus._3;
    this.list(request, this.pageNumber, () => {});
  }
  getReadyToSync(){
    const request = new PagedCertificatesSyncRequestDto();
    request.filter = serviceProxies.SyncStatus._4;
    console.log(request);
    
    this.list(request, this.pageNumber, () => {});
  }
}
