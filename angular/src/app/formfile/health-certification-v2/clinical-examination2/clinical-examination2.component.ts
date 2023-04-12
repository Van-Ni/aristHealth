import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-clinical-examination2',
  templateUrl: './clinical-examination2.component.html',
  styleUrls: ['./clinical-examination2.component.css']
})
export class ClinicalExamination2Component implements OnInit {
  @Input() Data: any;
  @Input() statusDataCheck: any;
  data:  any;
  statusDataCheck2: any;
  isTamThan2= true;
  isThaiSan2= true;
  isNoiTiet2= true;
  isCoXuongKhop2= true;
  isHoHap2= true;
  isTimMach2= true;
  isTaiMuiHong2= true;
  isMat2= true;
  isThanKinh2= true;
  isDaLieu2= true;
  isRangHamMat2= true;
  isNgoaiKhoa2= true;
  isThan2= true;
  isTieuHoa2= true;
  isTuanHoan2= true;
  constructor() { }

  ngOnInit() {
  }

}
