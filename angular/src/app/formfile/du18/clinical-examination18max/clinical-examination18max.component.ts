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
  @Input() checkgiay: number;
  constructor() { }
  klplModel: DefaultModel ={
    ketluanTitle : "Phân loại",
    phanloaiTitle: "Đánh giá",
    optionsKetLuan :["Loại I", "Loại II", "Loại III", "Loại IV", "Loại V"],
    optionsPhanLoai: ["Đủ sức khỏe"]
  }

  tsModel: DefaultModel ={
    ketluanTitle : "Phân loại",
    phanloaiTitle: "Đánh giá",
    optionsKetLuan :["Đủ sức khỏe", "Bình thường"],
    optionsPhanLoai: ["Tiền sử mở lấy thai. Hiện tại ổn định","Bình thường","Loại I", "Loại II", "Loại III", "Loại IV", "Loại V"]
  }
  nkModel: DefaultModel ={
    ketluanTitle : "Phân loại",
    phanloaiTitle: "Đánh giá",
    optionsKetLuan :["Bình thường", "Tiền sử mổ ruột thừa. Hiện tại ổn định"],
    optionsPhanLoai: ["Loại I", "Loại II", "Loại III", "Loại IV", "Loại V"]
  }
  ngAfterContentInit(): void {
  }
  
}
