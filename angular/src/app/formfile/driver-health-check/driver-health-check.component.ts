import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-driver-health-check',
  templateUrl: './driver-health-check.component.html',
  styleUrls: ['./driver-health-check.component.css']
})
export class DriverHealthCheckComponent implements OnInit {
  isProfile1 = true;
  isTSBCDTKSK1 =true;
  isKhamLamSan1= true;
  isKhamCanLamSan1 = true;
  isKetLuan1 = true;
  constructor() { }

  ngOnInit() {
  }

}
