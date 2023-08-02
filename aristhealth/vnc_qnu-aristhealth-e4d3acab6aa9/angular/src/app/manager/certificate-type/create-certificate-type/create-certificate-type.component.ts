import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CertificateDto, CertificateGroupStatusServiceServiceProxy, CertificateTypeDto, CertificateTypeServiceServiceProxy, CreateCertificateDto, CreateCertificateTypeDto, DepartmentDto } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-create-certificate-type',
  templateUrl: './create-certificate-type.component.html',
  styleUrls: ['./create-certificate-type.component.css']
})
export class CreateCertificateTypeComponent extends AppComponentBase implements OnInit {
  saving = false;
  certificateType = new CreateCertificateTypeDto();
  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private certificateTypeServiceServiceProxy: CertificateTypeServiceServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit() {
  }
  save(): void {
    this.saving = true;

    const certificateType = new CertificateTypeDto();
    certificateType.init(this.certificateType);
    console.log(certificateType)
    this.certificateTypeServiceServiceProxy
      .create(certificateType)
      .subscribe(
        () => {
          this.notify.info(this.l('SavedSuccessfully'));
          this.bsModalRef.hide();
          this.onSave.emit();
        },
        () => {
          this.saving = false;
        }
      );
  }
}
