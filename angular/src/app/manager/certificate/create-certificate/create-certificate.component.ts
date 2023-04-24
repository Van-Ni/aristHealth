import {
  Component,
  EventEmitter,
  Injector,
  OnInit,
  Output,
} from "@angular/core";
import { AppComponentBase } from "@shared/app-component-base";
import {
  CertificateServiceServiceProxy,
  CertificateTypeDto,
  CertificateTypeServiceServiceProxy,
  ClientInfoDto,
  CreateCertificateDto,
  RegionDto,
} from "@shared/service-proxies/service-proxies";
import { BsModalRef } from "ngx-bootstrap/modal";
import { RegionDtlFull } from "../certificate.component";
import { RegionsService } from "@app/services/regions.service";

@Component({
  selector: "app-create-certificate",
  templateUrl: "./create-certificate.component.html",
  styleUrls: ["./create-certificate.component.css"],
})
export class CreateCertificateComponent
  extends AppComponentBase
  implements OnInit
{
  certificate: CreateCertificateDto;
  certificateTypeDto: CertificateTypeDto;
  saving = false;
  provinces: RegionDtlFull[];
  districts: RegionDtlFull[];
  communes: RegionDtlFull[];
  container: any;
  @Output() onSave = new EventEmitter<any>();
  constructor(
    private certificateServiceServiceProxy: CertificateServiceServiceProxy,
    public bsModalRef: BsModalRef,
    private certificateType: CertificateTypeServiceServiceProxy,
    private regionsService: RegionsService,
    private injector: Injector
  ) {
    super(injector);
  }
  showDropdown = false;
  ngOnInit() {
    console.log(this.certificate);

    this.certificate = new CreateCertificateDto();
    this.certificate.clientInfo = new ClientInfoDto();
    this.certificate.clientInfo.provinceId = "64";
    this.certificate.clientInfo.addressCCCD =
      "Cục Cảnh sát quản lý hành chính về trật tự xã hội";
    this.getProvince();
    this.getDictrict();
    this.getCommune();
    // this.setgiatien();
  }
  getApi(data: any) {
    console.log(data.target.value);
    this.certificateType
      .get(data.target.value)
      .subscribe((result: CertificateTypeDto) => {
        console.log(result);
        this.certificate.amountPaid = result.price;
        this.container = result.price;
      });
  }
  setPrice(event: any) {
    if (event.target.value == 0) {
      this.certificate.amountPaid = 0;
    }
    if (event.target.value == 1) {
      this.certificate.amountPaid = this.certificateTypeDto.price;
    }
  }
  getProvince() {
    this.regionsService.getProvince().subscribe((result: RegionDto[]) => {
      this.provinces = result.map((r) => {
        return {
          childrent: [],
          name: r.name,
          id: r.id,
          parentId: r.parentId,
        };
      });
    });
  }
  getDictrict() {
    if (
      this.certificate.clientInfo.provinceId
    )
    this.regionsService
      .getDictrict(this.certificate.clientInfo.provinceId)
      .subscribe((result: RegionDto[]) => {
        this.districts = result.map((r) => {
          return {
            childrent: [],
            name: r.name,
            id: r.id,
            parentId: r.parentId,
          };
        });
        if (
          this.certificate.clientInfo &&
          !this.certificate.clientInfo.districtId
        ) {
          this.certificate.clientInfo.districtId = this.districts[0].id;
          this.getCommune();
        }
      });
  }
  getCommune() {
    if (
      this.certificate.clientInfo.provinceId &&
      this.certificate.clientInfo.districtId
    )
      this.regionsService
        .getCommune(
          this.certificate.clientInfo.provinceId,
          this.certificate.clientInfo.districtId
        )
        .subscribe((result: RegionDto[]) => {
          this.communes = result.map((r) => {
            return {
              childrent: [],
              name: r.name,
              id: r.id,
              parentId: r.parentId,
            };
          });
          if (
            this.certificate.clientInfo &&
            !this.certificate.clientInfo.communeId
          ) {
            console.log("this.communes: ", this.communes);
            this.certificate.clientInfo.communeId = this.communes[0].id;
          }
        });
  }
  save(): void {
    this.saving = true;
    this.certificate.clientInfo.commune = this.communes.find(
      (c) => c.id == this.certificate.clientInfo.communeId
    ).name;
    this.certificate.clientInfo.district = this.districts.find(
      (c) => c.id == this.certificate.clientInfo.districtId
    ).name;
    this.certificate.clientInfo.province = this.provinces.find(
      (c) => c.id == this.certificate.clientInfo.provinceId
    ).name;

    this.certificateServiceServiceProxy.create(this.certificate).subscribe(
      (result: CreateCertificateDto) => {
        this.notify.info(this.l("Lưu thành công."));
        this.bsModalRef.hide();
        this.onSave.emit();
      },
      () => {
        this.saving = false;
      }
    );
  }
}
