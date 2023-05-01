import { Component, Injector, Input } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CertificateDto } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent extends AppComponentBase{

  @Input()profile: CertificateDto;
  onSave: any;
  saving: boolean;
  isEditProfile: true;
  constructor(injector: Injector) { 
    super(injector);
  }

}
