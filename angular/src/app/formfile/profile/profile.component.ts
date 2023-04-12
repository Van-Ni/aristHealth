import { Component, Injector, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppComponentBase } from '@shared/app-component-base';
import { CertificateDto, ClientInfoDto, ClientInfoServiceServiceProxy, CreateClientInfoDto } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent extends AppComponentBase implements OnInit {
  clientInfo = new CreateClientInfoDto;
  @Input()profile: CertificateDto;
  onSave: any;
  saving: boolean;
  isEditProfile: true;
  constructor(private injector: Injector,private bsModalRef: BsModalRef, private clientInfoServiceProxy: ClientInfoServiceServiceProxy) { 
    super(injector);
  }
  ngOnInit() {
    this.clientInfo = this.profile.clientInfo;
    
  }
  save() : void{
    console.log(this.clientInfo);
    this.clientInfoServiceProxy.create(this.clientInfo).subscribe(
      (result: ClientInfoDto) => {
        
        this.notify.info(this.l('SavedSuccessfully. ID của bạn là: ' +result.id));
      },
      () => {
        this.saving = false;
      }
    );
  }

}
