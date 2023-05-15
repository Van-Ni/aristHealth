import { Component, OnInit } from "@angular/core";
import {
  CertificateSyncDto,
  RegionDto,
  RegionServiceServiceProxy,
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
  syncModel = new CertificateSyncDto();
  id: number;
  tinh: string;
  huyen: string;
  xa: string;
  checkedPermissionsMap: { [key: string]: boolean } = {};
  defaultPermissionCheckedStatus = true;
  constructor(
    private _certificateSyncService: SyncServiceServiceProxy,
    private _regionService: RegionServiceServiceProxy,
    public bsModalRef: BsModalRef
  ) { }

  ngOnInit() {
    this._certificateSyncService
      .get(this.id)
      .subscribe((result: CertificateSyncDto) => {
        this.syncModel = result;
        this._regionService.get(this.syncModel.metaData.matinH_THUONGTRU).subscribe((result: RegionDto) => {
          this.tinh = result.name;
        })
        this._regionService.get(this.syncModel.metaData.mahuyeN_THUONGTRU).subscribe((result: RegionDto) => {
          this.huyen = result.name;
        })
        this._regionService.get(this.syncModel.metaData.maxA_THUONGTRU).subscribe((result: RegionDto) => {
          this.xa = result.name;
        })
      });
  }
  save(): void {
    this.saving = true;
    this.saving = false;
  }
}
