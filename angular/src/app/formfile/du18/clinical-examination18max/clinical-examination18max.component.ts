import { AfterContentInit, Component, Input, OnInit } from '@angular/core';
import { Du18Model } from '../du18.component';
import { DefaultModel } from '@app/formfile/share/KetLuanPhanLoai/KetLuanPhanLoai.component';

@Component({
  selector: 'app-clinical-examination18max',
  templateUrl: './clinical-examination18max.component.html',
  styleUrls: ['./clinical-examination18max.component.css']
})
export class ClinicalExamination18maxComponent  implements AfterContentInit {
  @Input() Data: Du18Model;
  @Input() save: Function;
  @Input() statusDataCheck: any;
  data:  any;
  statusDataCheck1: any;

  constructor() { }
  klplModel: DefaultModel ={
    ketluanTitle : "Kết luận",
    phanloaiTitle: "Phân loại",
    optionsKetLuan :["Đủ sức khỏe", "Bình thường"],
    optionsPhanLoai: ["Bình thường","Loại 1", "Loại 2", "Loại 3", "Loại 4", "Loại 5"]
  }

  tsModel: DefaultModel ={
    ketluanTitle : "Kết luận",
    phanloaiTitle: "Phân loại",
    optionsKetLuan :["Đủ sức khỏe", "Bình thường"],
    optionsPhanLoai: ["Tiền sử mở lấy thai. Hiện tại ổn định","Bình thường","Loại 1", "Loại 2", "Loại 3", "Loại 4", "Loại 5"]
  }
  ngAfterContentInit(): void {
  }
  
}
