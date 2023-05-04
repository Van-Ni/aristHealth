import { Component, OnInit } from "@angular/core";
import {
  CertificateSyncDto,
  SyncServiceServiceProxy,
} from "@shared/service-proxies/service-proxies";
import { BsModalRef } from "ngx-bootstrap/modal";

@Component({
  selector: "app-certificate-sync-detail",
  templateUrl: "./certificate-sync-detail.component.html",
  styleUrls: ["./certificate-sync-detail.component.css"],
})
export class CertificateSyncDetailComponent implements OnInit {
  saving = false;
  id: number;
  sync: CertificateSyncDto = new CertificateSyncDto();
  constructor(
    private _certificateSyncService: SyncServiceServiceProxy,
    public bsModalRef: BsModalRef
    ) {}

  ngOnInit() {
    this._certificateSyncService
      .get(this.id)
      .subscribe((result: CertificateSyncDto) => {
        this.sync = result;
      });
  }
  save(): void {
    this.saving = true;
    this.saving = false;
  }
}
