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

  ngAfterContentInit(): void {
      this.data= this.Data;
      this.statusDataCheck1= this.statusDataCheck;
  }
}
