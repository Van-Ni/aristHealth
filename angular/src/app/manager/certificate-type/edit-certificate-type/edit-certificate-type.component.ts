import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CreateCertificateTypeDto, CertificateTypeServiceServiceProxy, CertificateTypeDto } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-edit-certificate-type',
  templateUrl: './edit-certificate-type.component.html',
  styleUrls: ['./edit-certificate-type.component.css']
})
export class EditCertificateTypeComponent extends AppComponentBase implements OnInit {
  id: number;
  saving = false;
  certificateType = new CertificateTypeDto;
  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private certificateTypeServiceServiceProxy: CertificateTypeServiceServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit() {
    this.certificateTypeServiceServiceProxy
      .get(this.id)
      .subscribe((result: CertificateTypeDto) => {
        this.certificateType = result;
        console.log(result)
      });
  }
  save(): void {
    this.saving = true;

    const certificateType = new CertificateTypeDto();
    certificateType.init(this.certificateType);
    console.log(certificateType)
    this.certificateTypeServiceServiceProxy
      .update(certificateType)
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
