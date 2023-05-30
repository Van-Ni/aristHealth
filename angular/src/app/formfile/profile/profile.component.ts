import { Component, Inject, Injector, Input } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { API_BASE_URL, CertificateDto } from '@shared/service-proxies/service-proxies';

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
  constructor(injector: Injector, @Inject(API_BASE_URL) public baseUrl?: string) {
    super(injector);
  }


}
