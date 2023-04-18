import { Component, Injector, Input, OnInit } from '@angular/core';
import { CertificateKeyValueComponentBase } from '@app/manager/base-certificate';
import { DataService } from '@app/services/data.service';
import { CertificateGroupStatusDto, CertificateGroupStatusServiceServiceProxy, PDFServiceServiceProxy } from '@shared/service-proxies/service-proxies';
import { PermissionCheckerService } from 'abp-ng2-module';

@Component({
  selector: 'app-appove1',
  templateUrl: './appove1.component.html',
  styleUrls: ['./appove1.component.css']
})
export class Appove1Component  {

  isEditable2= false;
  @Input() save: Function;
  @Input() Data: CertificateGroupStatusDto;
  constructor(protected _permissionChecker: PermissionCheckerService) { }
  ngOnInit(): void {
  }
  approve() {
    
    this.save()
  }
  // print(): void
  // {
  //   if(this.status)
  //   {
  //     this.PDFServiceServiceProxy.fillPDFWithCertificate(this.certificateId).subscribe(
  //       (response: any) => {
  //         console.log(response);

  //         if (response) { // Check if the response body is not null or undefined
  //           //const blob = new Blob([response.body], { type: 'application/pdf' });
  //           const url = URL.createObjectURL(response);
  //           const link = document.createElement('a');
  //           link.href = url;
  //           link.download = 'filled_certificate.pdf';
  //           link.target = '_blank';
  //           link.click();
  //         } else {
  //           // Handle null or undefined response body
  //           console.error('Response body is null or undefined');
  //         }
  //       },
  //       error => {
  //         // Handle error
  //         console.error(error);
  //       }
  //     );
  //   }
  // }
}
