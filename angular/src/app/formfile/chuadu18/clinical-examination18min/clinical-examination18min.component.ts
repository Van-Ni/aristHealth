import { AfterContentInit, Component, Input, OnInit } from '@angular/core';
import { Du18Model } from '@app/formfile/du18/du18.component';
import { DefaultModel } from '@app/formfile/share/KetLuanPhanLoai/KetLuanPhanLoai.component';
import { ChuaDu18Model } from '../chuadu18.component';

@Component({
  selector: 'app-clinical-examination18min',
  templateUrl: './clinical-examination18min.component.html',
  styleUrls: ['./clinical-examination18min.component.css']
})
export class ClinicalExamination18minComponent  implements AfterContentInit {
  @Input() Data: ChuaDu18Model;
  @Input() save: Function;
  @Input() checkgiay:number;
  constructor() { }
  klplModel: DefaultModel ={
    ketluanTitle : "Kết luận",
    phanloaiTitle: "Phân loại",
    optionsKetLuan :["Đủ sức khỏe", "Bình thường"],
    optionsPhanLoai: ["Bình thường","Loại I", "Loại II", "Loại III", "Loại IV", "Loại V"]
  }

  tsModel: DefaultModel ={
    ketluanTitle : "Kết luận",
    phanloaiTitle: "Phân loại",
    optionsKetLuan :["Đủ sức khỏe", "Bình thường"],
    optionsPhanLoai: ["Tiền sử mở lấy thai. Hiện tại ổn định","Bình thường","Loại I", "Loại II", "Loại III", "Loại IV", "Loại V"]
  }
 

  ngAfterContentInit(): void {
  }
  
}
