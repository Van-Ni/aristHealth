import { AfterContentInit, AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IPagedResultDto } from '@shared/paged-listing-component-base';

@Component({
  selector: 'app-clinical-examination1',
  templateUrl: './clinical-examination1.component.html',
  styleUrls: ['./clinical-examination1.component.css']
})
export class ClinicalExamination1Component implements AfterContentInit {
  @Input() Data: any;
  @Input() statusDataCheck: any;
  data:  any;
  statusDataCheck1: any;
  isTamThan1= false;
  isThaiSan1= false;
  isNoiTiet1= false;
  isCoXuongKhop1= false;
  isHoHap1= false;
  isTimMach1= false;
  isTaiMuiHong1= false;
  isMat1= false;
  isThanKinh1= false;
  constructor() { }

  ngAfterContentInit(): void {
  }
}
