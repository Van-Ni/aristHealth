import { Component, Injector, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CertificateServiceServiceProxy, ClientInfoDto, CreateCertificateDto, RegionDto, RegionServiceServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { RegionDtlFull } from '../certificate.component';

@Component({
  selector: 'app-create-certificate',
  templateUrl: './create-certificate.component.html',
  styleUrls: ['./create-certificate.component.css']
})
export class CreateCertificateComponent extends AppComponentBase implements OnInit {
  certificate: CreateCertificateDto;
  saving = false;
  provinces: RegionDtlFull[];

  constructor(private certificateServiceServiceProxy: CertificateServiceServiceProxy, public bsModalRef: BsModalRef,
    private regionService: RegionServiceServiceProxy,
    private injector: Injector) {
    super(injector);
  }
  showDropdown = false;
  ngOnInit() {
    this.certificate = new CreateCertificateDto();
    this.certificate.clientInfo = new ClientInfoDto();
    //this.getRegions();
  }
  getRegions() {
    this.regionService.getAll(this.certificate.clientInfo.district, this.certificate.clientInfo.commune).subscribe(
      (result: RegionDto[]) => {
        if (this.certificate.clientInfo.district == null && this.certificate.clientInfo.commune == null) {
          
          this.provinces = result.map(r => {
            return {
              childrent: [],
              name: r.name,
              id: r.id,
              parentId: r.parentId
            };
          })
          console.log(this.provinces);
          
        }
      }
    );
  }
  save(): void {
    this.saving = true;
    console.log(this.certificate);
    this.certificateServiceServiceProxy.create(this.certificate).subscribe(
      (result: CreateCertificateDto) => {

        this.notify.info(this.l('SavedSuccessfully.'));
        this.bsModalRef.hide();
      },
      () => {
        this.saving = false;
      }
    );
  }
}
