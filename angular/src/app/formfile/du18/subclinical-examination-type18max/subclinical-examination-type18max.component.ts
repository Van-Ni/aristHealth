import { Component, Input, OnInit } from '@angular/core';
import { Du18Model } from '../du18.component';
import { DefaultModel } from '@app/formfile/share/KetLuanPhanLoai/KetLuanPhanLoai.component';

@Component({
  selector: 'app-subclinical-examination-type18max',
  templateUrl: './subclinical-examination-type18max.component.html',
  styleUrls: ['./subclinical-examination-type18max.component.css']
})
export class SubclinicalExaminationType18maxComponent implements OnInit {
  ngOnInit(): void {
    console.log(this.Data);
    
  }
  @Input() checkgiay: number;
  @Input() Data: Du18Model;
  @Input() save: Function;
  klplModel: DefaultModel ={
    ketluanTitle : "Kết luận",
    phanloaiTitle: "Phân loại",
    optionsKetLuan :["Đủ sức khỏe", "Bình thường"],
    optionsPhanLoai: ["Bình thường","Loại 1", "Loại 2", "Loại 3", "Loại 4", "Loại 5"]
  }
}
