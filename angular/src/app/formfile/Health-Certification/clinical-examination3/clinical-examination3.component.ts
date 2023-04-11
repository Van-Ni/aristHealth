import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-clinical-examination3',
  templateUrl: './clinical-examination3.component.html',
  styleUrls: ['./clinical-examination3.component.css']
})
export class ClinicalExamination3Component implements OnInit {
  @Input() Data: any;
  data:  any;
  isTamThan1= true;
  isThaiSan1= true;
  isNoiTiet1= true;
  isCoXuongKhop1= true;
  isHoHap1= true;
  isTimMach1= true;
  isTaiMuiHong1= true;
  isMat1= true;
  isThanKinh1= true;
  isDaLieu1= true;
  isRangHamMat1= true;
  isNgoaiKhoa1= true;
  isThan1= true;
  isTieuHoa1= true;
  isTuanHoan1= true;
  constructor() { }

  ngOnInit() {
  }

}
