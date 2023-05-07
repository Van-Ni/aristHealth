import { Component, Injector, OnInit } from "@angular/core";
import {
  PagedListingComponentBase,
  PagedRequestDto,
} from "@shared/paged-listing-component-base";
import { CertificateSyncDto } from "@shared/service-proxies/service-proxies";

import * as serviceProxies from "@shared/service-proxies/service-proxies";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { CertificateSyncDetailComponent } from "./certificate-sync-detail/certificate-sync-detail.component";

@Component({
  selector: "app-certificate-sync",
  templateUrl: "./certificate-sync.component.html",
  styleUrls: ["./certificate-sync.component.css"],
})
export class CertificateSyncComponent extends PagedListingComponentBase<CertificateSyncDto> {
  protected list(
    request: PagedRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    this._certificateSyncService
      .getAll("creationTime desc", request.skipCount, request.maxResultCount)
      .subscribe((result) => {
        this.certificateSyncDtos = result.items;
        console.log(result);
        
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

    createOrEditSyncDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }
}
