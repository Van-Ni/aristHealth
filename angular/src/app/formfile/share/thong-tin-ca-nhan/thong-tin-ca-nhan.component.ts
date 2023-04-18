import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-thong-tin-ca-nhan',
  templateUrl: './thong-tin-ca-nhan.component.html',
  styleUrls: ['./thong-tin-ca-nhan.component.css']
})
export class ThongTinCaNhanComponent implements OnInit {
  expandStatus = false;
  @Input() title: string;
  @Input() status: number;
  constructor() { }

  ngOnInit() {
  }

}
