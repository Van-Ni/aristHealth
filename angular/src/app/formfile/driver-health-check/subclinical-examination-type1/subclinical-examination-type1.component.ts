import { AfterContentInit, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-subclinical-examination-type1',
  templateUrl: './subclinical-examination-type1.component.html',
  styleUrls: ['./subclinical-examination-type1.component.css']
})
export class SubclinicalExaminationType1Component implements AfterContentInit  {
  isXetNghiemMaTuy = true;
  isXetNghiemKhac =true;
  @Input() Data: any;
  @Input() statusDataCheck: any;
  data:  any;
  statusDataCheck1: any;
  constructor() { }

  ngAfterContentInit(): void {
      
    this.data= this.Data;
    this.statusDataCheck = this.statusDataCheck1;
}

}
