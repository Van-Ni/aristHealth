import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CreateCertificateGroupStatusDto, CertificateGroupStatusServiceServiceProxy, CertificateGroupStatusDto } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-edit-certificate-group-status',
  templateUrl: './edit-certificate-group-status.component.html',
  styleUrls: ['./edit-certificate-group-status.component.css']
})
export class EditCertificateGroupStatusComponent extends AppComponentBase implements OnInit {
  saving = false;
  id: string;
  certificateGroup = new CertificateGroupStatusDto();
  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private certificateGroupStatusServiceServiceProxy: CertificateGroupStatusServiceServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit() {
    this.certificateGroupStatusServiceServiceProxy
      .get(this.id)
      .subscribe((result: CertificateGroupStatusDto) => {
        this.certificateGroup = result;
        console.log(result)
      });
  }
  save(): void {
    this.saving = true;

    const certificateGroup = new CertificateGroupStatusDto();
    certificateGroup.init(this.certificateGroup);
    console.log(certificateGroup)
    this.certificateGroupStatusServiceServiceProxy
      .update(certificateGroup)
      .subscribe(
        () => {
          this.notify.info(this.l('Lưu thành công'));
          this.bsModalRef.hide();
          this.onSave.emit();
        },
        () => {
          this.saving = false;
        }
      );
  }
}
