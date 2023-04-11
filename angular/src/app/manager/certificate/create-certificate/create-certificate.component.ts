import { Component, Injector, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CertificateDto, CertificateGroupStatusServiceServiceProxy, CertificateServiceServiceProxy, ClientInfoDto, CreateCertificateDto } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-create-certificate',
  templateUrl: './create-certificate.component.html',
  styleUrls: ['./create-certificate.component.css']
})
export class CreateCertificateComponent extends AppComponentBase implements OnInit {
  certificate:CreateCertificateDto;
  saving: boolean;
  constructor(private certificateServiceServiceProxy: CertificateServiceServiceProxy, private injector: Injector) 
  {
    super(injector);
   }

  ngOnInit() {
    this.certificate = new CreateCertificateDto();
    this.certificate.clientInfo = new ClientInfoDto();
  }
  save():void{
    this.certificateServiceServiceProxy.create(this.certificate).subscribe(
      (result: CreateCertificateDto) => {
        
        this.notify.info(this.l('SavedSuccessfully.'));
      },
      () => {
        this.saving = false;
      }
    );
  }
}
