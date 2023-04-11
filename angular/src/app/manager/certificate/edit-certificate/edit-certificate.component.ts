import { Component, Injector, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CertificateDto, CertificateServiceServiceProxy, ClientInfoDto, CreateCertificateDto, UpdateCertificateDto } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-edit-certificate',
  templateUrl: './edit-certificate.component.html',
  styleUrls: ['./edit-certificate.component.css']
})
export class EditCertificateComponent extends AppComponentBase implements OnInit {
  certificate:UpdateCertificateDto;
  saving: boolean;
  id: string;
  constructor(private certificateServiceServiceProxy: CertificateServiceServiceProxy, private injector: Injector) 
  {
    super(injector);
   }

  ngOnInit() {
    this.certificate = new UpdateCertificateDto();
    this.certificate.clientInfo = new ClientInfoDto();
    this.certificateServiceServiceProxy
      .get(this.id)
      .subscribe((result: CertificateDto) => {
        this.certificate = result;
        console.log(this.certificate)
      });
  }
  save():void{
    this.certificateServiceServiceProxy.update(this.certificate).subscribe(
      (result: CertificateDto) => {
        
        this.notify.info(this.l('SavedSuccessfully.'));
      },
      () => {
        this.saving = false;
      }
    );
  }
}
