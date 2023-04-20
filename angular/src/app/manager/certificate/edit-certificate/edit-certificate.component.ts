import { AfterContentInit, Component, EventEmitter, Injector, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CertificateDto, CertificateServiceServiceProxy, ClientInfoDto, CreateCertificateDto, RegionDto, RegionServiceServiceProxy, UpdateCertificateDto } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { RegionDtlFull } from '../certificate.component';
import { RegionsService } from '@app/services/regions.service';

@Component({
  selector: 'app-edit-certificate',
  templateUrl: './edit-certificate.component.html',
  styleUrls: ['./edit-certificate.component.css']
})
export class EditCertificateComponent extends AppComponentBase implements OnInit {
  certificate:UpdateCertificateDto;
  saving: boolean;
  id: string;
  provinces: RegionDtlFull[]=[];
  districts: RegionDtlFull[]=[];
  communes: RegionDtlFull[]=[];
  @Output() onSave = new EventEmitter<any>();
  constructor(private certificateServiceServiceProxy: CertificateServiceServiceProxy,
    private regionService: RegionServiceServiceProxy,
    private regionsService: RegionsService,
    public bsModalRef: BsModalRef,
    private injector: Injector) 
  {
    super(injector);
   }

  ngOnInit() {    
    this.certificateServiceServiceProxy
      .getProfile(this.id)
      .subscribe((result: CertificateDto) => {
        this.certificate = result;
        console.log(this.certificate);
        this.provinces = [{
          id : this.certificate.clientInfo.provinceId,
          name : this.certificate.clientInfo.province,
          childrent : []
        }]
        this.districts = [{
          id : this.certificate.clientInfo.districtId,
          name : this.certificate.clientInfo.district,
          childrent : []
        }]
        this.communes = [{
          id : this.certificate.clientInfo.communeId,
          name : this.certificate.clientInfo.commune,
          childrent : []
        }]
      });
      this.getProvince();

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
  save():void{
    this.certificate.clientInfo.commune = this.communes.find(c=>c.id == this.certificate.clientInfo.communeId).name;
    this.certificate.clientInfo.district = this.districts.find(c=>c.id == this.certificate.clientInfo.districtId).name;
    this.certificate.clientInfo.province = this.provinces.find(c=>c.id == this.certificate.clientInfo.provinceId).name;
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
