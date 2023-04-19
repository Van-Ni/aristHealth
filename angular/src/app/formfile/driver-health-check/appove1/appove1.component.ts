import { Component, Input } from '@angular/core';
import { CertificateGroupStatusDto } from '@shared/service-proxies/service-proxies';
import { PermissionCheckerService } from 'abp-ng2-module';

@Component({
  selector: 'app-appove1',
  templateUrl: './appove1.component.html',
  styleUrls: ['./appove1.component.css']
})
export class Appove1Component  {

  isEditable2= false;
  @Input() approve: Function;
  @Input() unapprove: Function;
  @Input() Data: CertificateGroupStatusDto;
  @Input() tdv: CertificateGroupStatusDto;
  constructor(protected _permissionChecker: PermissionCheckerService) { }
  ngOnInit(): void {
  }
  approveFc() {
    this.approve()
  }
  unapproveFc(){
    this.unapprove()
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
