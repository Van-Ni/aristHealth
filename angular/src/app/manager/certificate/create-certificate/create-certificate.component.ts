import { Component, Injector, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CertificateDto, CertificateGroupStatusServiceServiceProxy, CertificateServiceServiceProxy, ClientInfoDto, CreateCertificateDto } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-create-certificate',
  templateUrl: './create-certificate.component.html',
  styleUrls: ['./create-certificate.component.css']
})
export class CreateCertificateComponent extends AppComponentBase implements OnInit {
  certificate: CreateCertificateDto;
  saving = false;
  constructor(private certificateServiceServiceProxy: CertificateServiceServiceProxy, public bsModalRef: BsModalRef,
    private injector: Injector) {
    super(injector);
  }
  options = ["Cục Cảnh sát quản lý hành chính về trật tự xã hội"];
  filteredOptions = [];
  showDropdown = false;
  ngOnInit() {
    this.certificate = new CreateCertificateDto();
    this.certificate.clientInfo = new ClientInfoDto();
    this.filterData('');
  }
  filterData(enteredData){
    this.filteredOptions = this.options.filter(item => {
      return item.toLowerCase().indexOf(enteredData.toLowerCase()) > -1
    })
    this.showDropdown = true;
  }
  selectOption(option: string) {
    this.certificate.clientInfo.addressCCCD = option;
    this.filteredOptions = [];
    this.showDropdown = false;
  }
  save(): void {
    this.saving = true;
    console.log(this.certificate);
    this.certificateServiceServiceProxy.create(this.certificate).subscribe(
      (result: CreateCertificateDto) => {

        this.notify.info(this.l('SavedSuccessfully.'));
        this.bsModalRef.hide();
      },
      () => {
        this.saving = false;
      }
    );
  }
}
