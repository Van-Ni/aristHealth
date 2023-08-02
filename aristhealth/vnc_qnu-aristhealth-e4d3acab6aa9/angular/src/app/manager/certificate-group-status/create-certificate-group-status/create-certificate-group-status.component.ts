import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CertificateGroupStatusServiceServiceProxy, CreateCertificateGroupStatusDto } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-create-certificate-group-status',
  templateUrl: './create-certificate-group-status.component.html',
  styleUrls: ['./create-certificate-group-status.component.css']
})
export class CreateCertificateGroupStatusComponent  extends AppComponentBase implements OnInit {
  saving = false;
  createCertificateGroup = new CreateCertificateGroupStatusDto();
  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private certificateGroupStatusServiceServiceProxy: CertificateGroupStatusServiceServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit() {
  }
  save(): void {
    this.saving = true;

    const createCertificateGroup = new CreateCertificateGroupStatusDto();
    createCertificateGroup.init(this.createCertificateGroup);
    console.log(createCertificateGroup)
    this.certificateGroupStatusServiceServiceProxy
      .create(createCertificateGroup)
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
