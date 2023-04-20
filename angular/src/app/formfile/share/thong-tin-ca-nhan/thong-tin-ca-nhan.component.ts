import { Component, Input, OnInit } from '@angular/core';
import { CertificateDto } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-thong-tin-ca-nhan',
  templateUrl: './thong-tin-ca-nhan.component.html',
  styleUrls: ['./thong-tin-ca-nhan.component.css']
})
export class ThongTinCaNhanComponent implements OnInit {
  expandStatus = false;
  @Input()profile: CertificateDto;
  @Input() title: string;
  @Input() status: number;
  constructor() { }

  ngOnInit() {
  }

}
