import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CertificateDto, CertificateServiceServiceProxy, ClientInfoDto, CreateCertificateDto, RegionDto, RegionServiceServiceProxy, UpdateCertificateDto } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { RegionDtlFull } from '../certificate.component';

@Component({
  selector: 'app-edit-certificate',
  templateUrl: './edit-certificate.component.html',
  styleUrls: ['./edit-certificate.component.css']
})
export class EditCertificateComponent extends AppComponentBase implements OnInit {
  certificate:UpdateCertificateDto;
  saving: boolean;
  id: string;
  provinces: RegionDtlFull[];
  districts: RegionDtlFull[];
  communes: RegionDtlFull[];
  @Output() onSave = new EventEmitter<any>();
  constructor(private certificateServiceServiceProxy: CertificateServiceServiceProxy,
    private regionService: RegionServiceServiceProxy,
    public bsModalRef: BsModalRef,
    private injector: Injector) 
  {
    super(injector);
   }

  ngOnInit() {
    this.certificate = new UpdateCertificateDto();
    this.certificate.clientInfo = new ClientInfoDto();
    this.certificateServiceServiceProxy
      .getProfile(this.id)
      .subscribe((result: CertificateDto) => {
        this.certificate = result;
        console.log(this.certificate)
      });
      this.getRegions();
  }
  getRegions() {

    console.log("provinces",this.certificate.clientInfo.province);
    console.log("district",this.certificate.clientInfo.district);
    console.log("commune",this.certificate.clientInfo.commune);
    this.regionService.getAll(this.certificate.clientInfo.province, this.certificate.clientInfo.district).subscribe(
      (result: RegionDto[]) => {
        if (this.certificate.clientInfo.province == null && this.certificate.clientInfo.district == null) {
          
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
        else if (this.certificate.clientInfo.province != null && this.certificate.clientInfo.district == null) {
          
          this.districts = result.map(r => {
            return {
              childrent: [],
              name: r.name,
              id: r.id,
              parentId: r.parentId
            };
          })
          console.log(this.districts);
        }
        else if (this.certificate.clientInfo.province != null && this.certificate.clientInfo.district != null){
          this.communes = result.map(r => {
            return {
              childrent: [],
              name: r.name,
              id: r.id,
              parentId: r.parentId
            };
          })
          console.log(this.communes);
          
        }
      }
    );
  }
  save():void{
    this.certificateServiceServiceProxy.update(this.certificate).subscribe(
      (result: CertificateDto) => {
        
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
