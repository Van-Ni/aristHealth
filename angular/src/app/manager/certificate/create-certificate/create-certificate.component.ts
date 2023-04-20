import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CertificateServiceServiceProxy, ClientInfoDto, CreateCertificateDto, RegionDto, RegionServiceServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { RegionDtlFull } from '../certificate.component';
import { RegionsService } from '@app/services/regions.service';

@Component({
  selector: 'app-create-certificate',
  templateUrl: './create-certificate.component.html',
  styleUrls: ['./create-certificate.component.css']
})
export class CreateCertificateComponent extends AppComponentBase implements OnInit {
  certificate: CreateCertificateDto;
  saving = false;
  provinces: RegionDtlFull[];
  districts: RegionDtlFull[];
  communes: RegionDtlFull[];
  @Output() onSave = new EventEmitter<any>();
  constructor(private certificateServiceServiceProxy: CertificateServiceServiceProxy, public bsModalRef: BsModalRef,
    private regionsService: RegionsService,
    private injector: Injector) {
    super(injector);
  }
  showDropdown = false;
  ngOnInit() {
    this.certificate = new CreateCertificateDto();
    this.certificate.clientInfo = new ClientInfoDto();
  }
  getProvince(){
    console.log("province");

  }
  getDictrict(){
    console.log("district");
    this.regionsService.getDictrict(this.certificate.clientInfo.district);
  }
  getCommune(){
    console.log("commune");
    this.regionsService.getCommune(this.certificate.clientInfo.district,this.certificate.clientInfo.commune);
  }
  // getRegions() {
  //   console.log("provinces",this.certificate.clientInfo.province);
  //   console.log("district",this.certificate.clientInfo.district);
  //   console.log("commune",this.certificate.clientInfo.commune);
  //   this.regionService.getAll(this.certificate.clientInfo.province, this.certificate.clientInfo.district).subscribe(
  //     (result: RegionDto[]) => {
  //       if (this.certificate.clientInfo.province == null && this.certificate.clientInfo.district == null) {

  //         this.provinces = result.map(r => {
  //           return {
  //             childrent: [],
  //             name: r.name,
  //             id: r.id,
  //             parentId: r.parentId
  //           };
  //         })
  //         console.log(this.provinces);
  //       }
  //       else if (this.certificate.clientInfo.province != null && this.certificate.clientInfo.district == null) {

  //         this.districts = result.map(r => {
  //           return {
  //             childrent: [],
  //             name: r.name,
  //             id: r.id,
  //             parentId: r.parentId
  //           };
  //         })
  //         console.log(this.districts);
  //       }
  //       else if (this.certificate.clientInfo.province != null && this.certificate.clientInfo.district != null){
  //         this.communes = result.map(r => {
  //           return {
  //             childrent: [],
  //             name: r.name,
  //             id: r.id,
  //             parentId: r.parentId
  //           };
  //         })
  //         console.log(this.communes);

  //       }
  //     }
  //   );
  // }
  save(): void {
    this.saving = true;
    this.certificateServiceServiceProxy.create(this.certificate).subscribe(
      (result: CreateCertificateDto) => {

        this.notify.info(this.l('SavedSuccessfully.'));
        this.bsModalRef.hide();
        this.onSave.emit();
      },
      () => {
        this.saving = false;
      }
    );
  }
}
