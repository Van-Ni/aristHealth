import { Component, Input, OnInit } from '@angular/core';
import { ClinicalExaminationModel } from '../clinical-examination1/clinical-examination1.component';
export interface SubclinicalExaminationType1Model{
  ketluanTitle: string,
  optionsKetLuan: string[],
  phanloaiTitle: string,
  optionsPhanLoai: string[],
}
@Component({
  selector: 'app-subclinical-examination-type1',
  templateUrl: './subclinical-examination-type1.component.html',
  styleUrls: ['./subclinical-examination-type1.component.css']
})
export class SubclinicalExaminationType1Component implements OnInit {
  @Input() SubclinicalExaminationType1Model: SubclinicalExaminationType1Model ;
  @Input() Data: ClinicalExaminationModel;
  @Input() save: Function;
  @Input() checkgiay: number;
  constructor() { }
  ngOnInit() {
  }
}
