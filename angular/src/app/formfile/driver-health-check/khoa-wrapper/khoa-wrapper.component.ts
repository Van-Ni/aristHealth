import { Component, Input, OnInit } from '@angular/core';
import { CertificateGroupStatusDto } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-khoa-wrapper',
  templateUrl: './khoa-wrapper.component.html',
  styleUrls: ['./khoa-wrapper.component.css']
})
export class KhoaWrapperComponent implements OnInit {
  expandStatus = true;
  @Input() title: string;
  @Input() status: number;

  @Input() userInput: CertificateGroupStatusDto;
  constructor() { }

  ngOnInit() {
 
  }
  getBackgroundColor(status: number){
    switch(status)
    {
      case 0:
        return '#dc3545';
      case 1:
        return '#28a745';
      case 2:
        return '#dc3545';
      default:
        return 'black';
    }
  }
}
