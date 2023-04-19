import { AfterContentInit, Component, Input } from '@angular/core';
import { DefaultModel } from '@app/formfile/share/KetLuanPhanLoai/KetLuanPhanLoai.component';
import { CertificateGroupStatusDto } from '@shared/service-proxies/service-proxies';
import { Mat1Model } from './mat1/mat1.component';

export interface ClinicalExaminationModel{
  thankinh: CertificateGroupStatusDto;
  tamthan: CertificateGroupStatusDto;
  mat: CertificateGroupStatusDto;
  noitiet: CertificateGroupStatusDto;
  xetnghiemmatuyvamau: CertificateGroupStatusDto;
  coxuongkhop: CertificateGroupStatusDto;
  thaisan: CertificateGroupStatusDto;
  hohap: CertificateGroupStatusDto;
  taimuihong: CertificateGroupStatusDto;
  ketluan: CertificateGroupStatusDto;
  xetnghiemkhac: CertificateGroupStatusDto;
  timmach: CertificateGroupStatusDto;
  tdv: CertificateGroupStatusDto;
}

@Component({
  selector: 'app-clinical-examination1',
  templateUrl: './clinical-examination1.component.html',
  styleUrls: ['./clinical-examination1.component.css']
})
export class ClinicalExamination1Component implements AfterContentInit {
  @Input() Data: ClinicalExaminationModel;
  @Input() save: Function;
  @Input() checkgiay: number;
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
