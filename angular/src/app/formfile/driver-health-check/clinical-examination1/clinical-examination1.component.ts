import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clinical-examination1',
  templateUrl: './clinical-examination1.component.html',
  styleUrls: ['./clinical-examination1.component.css']
})
export class ClinicalExamination1Component implements OnInit {
  isTamThan1= true;
  isThaiSan1= true;
  isNoiTiet1= true;
  isCoXuongKhop1= true;
  isHoHap1= true;
  isTimMach1= true;
  isTaiMuiHong1= true;
  isMat1= true;
  isThanKinh1= true;
  constructor() { }

  ngOnInit() {
  }

}
