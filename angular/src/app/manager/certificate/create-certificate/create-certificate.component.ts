import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CertificateServiceServiceProxy, ClientInfoDto, CreateCertificateDto, RegionDto } from '@shared/service-proxies/service-proxies';
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
  provinces: RegionDtlFull[] = [{
    id: '64',
    name: 'Tỉnh Gia Lai',
    childrent: []
  }];
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
    this.certificate.clientInfo.provinceId = "64";
    this.certificate.clientInfo.addressCCCD = "Cục Cảnh sát quản lý hành chính về trật tự xã hội";
    this.getProvince();
    this.getDictrict();
    this.getCommune();
  }
  getProvince() {
   this.regionsService.getProvince().subscribe((result:RegionDto[])=>{
    this.provinces = result.map(r => {
      return {
        childrent: [],
        name: r.name,
        id: r.id,
        parentId: r.parentId
      };
    })
   })
  }
  getDictrict(){
    this.regionsService.getDictrict(this.certificate.clientInfo.provinceId).subscribe((result:RegionDto[])=>{
      this.districts = result.map(r => {
        return {
          childrent: [],
          name: r.name,
          id: r.id,
          parentId: r.parentId
        };
      })
     })
  }
  getCommune(){
    this.regionsService.getCommune(this.certificate.clientInfo.provinceId, this.certificate.clientInfo.districtId).subscribe((result:RegionDto[])=>{
      this.communes = result.map(r => {
        return {
          childrent: [],
          name: r.name,
          id: r.id,
          parentId: r.parentId
        };
      })
     })
  }
  save(): void {
    this.saving = true;
    this.certificate.clientInfo.commune = this.communes.find(c=>c.id == this.certificate.clientInfo.communeId).name;
    this.certificate.clientInfo.district = this.districts.find(c=>c.id == this.certificate.clientInfo.districtId).name;
    this.certificate.clientInfo.province = this.provinces.find(c=>c.id == this.certificate.clientInfo.provinceId).name;
    
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
