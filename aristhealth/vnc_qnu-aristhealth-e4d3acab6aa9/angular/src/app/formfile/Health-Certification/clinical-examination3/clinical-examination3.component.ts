import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-clinical-examination3',
  templateUrl: './clinical-examination3.component.html',
  styleUrls: ['./clinical-examination3.component.css']
})
export class ClinicalExamination3Component implements OnInit {
  @Input() Data: any;
  @Input() statusDataCheck: any;
  data:  any;
  statusDataCheck3: any;
  isTamThan3= true;
  isThaiSan3= true;
  isNoiTiet3= true;
  isCoXuongKhop3= true;
  isHoHap3= true;
  isTimMach3= true;
  isTaiMuiHong3= true;
  isMat3= true;
  isThanKinh3= true;
  isDaLieu3= true;
  isRangHamMat3= true;
  isNgoaiKhoa3= true;
  isThan3= true;
  isTieuHoa3= true;
  isTuanHoan3= true;
  constructor() { }

  ngOnInit() {
  }

}
