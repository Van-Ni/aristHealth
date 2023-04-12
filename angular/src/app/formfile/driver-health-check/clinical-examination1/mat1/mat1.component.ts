import { Component, Injector, Input, OnInit } from '@angular/core';
import { DataService } from '@app/services/data.service';
import { AppComponentBase } from '@shared/app-component-base';
import { CertificateGroupStatusDto, CertificateGroupStatusDtoPagedResultDto, CertificateGroupStatusServiceServiceProxy, CreateMedicationKeyResultDto, KhoaMatServiceServiceProxy, MedicationKeyResultDtoPagedResultDto } from '@shared/service-proxies/service-proxies';
import { PermissionCheckerService } from 'abp-ng2-module';
import { Certificate } from 'crypto';
import { result } from 'lodash-es'; 
import {CertificateKeyValueComponentBase} from '../../../../manager/base-certificate';
import { ActivatedRoute } from '@angular/router';

interface Mat1ViewModel {
  mat_text_kk_mt: string;
  mat_text_kk_mp: string;
  mat_text_ck_mt: string;
  mat_text_ck_mp: string;
  mat_text_2m_ck: string;
  mat_text_2m_kk: string;
  mat_radio_thitruong_ngang: string;
  mat_radio_thitruong_dung: string;
  mat_checkbox_bth: string;
  mat_checkbox_mumau_all: string;
  mat_checkbox_mumau_do:string;
  mat_checkbox_mumau_vang: string;
  mat_checkbox_mumau_xanh: string;
  mat_text_cbvm: string;
  mat_text_mat_ketluan: string; 
}
@Component({
  selector: 'app-mat1',
  templateUrl: './mat1.component.html',
  styleUrls: ['./mat1.component.css']
})
export class Mat1Component extends CertificateKeyValueComponentBase<Mat1ViewModel> implements OnInit {
  setViewModel(model: MedicationKeyResultDtoPagedResultDto) {    
    let object = Object.fromEntries(new Map(model.items.map(obj=>{
      return [obj.key, obj.value]})));
      this.mat1 = object as unknown as Mat1ViewModel;
  }
  
  @Input() Data: any;
  mat1 :Mat1ViewModel;  
  @Input() statusDataCheck: any;
  keys = [""];
  isEditable3= false;
  certificateId: string;
  certificateStatus: CertificateGroupStatusDto;
  status = false;
  constructor(private dataservice: DataService,private injector: Injector, private khoaMatServiceServiceProxy: KhoaMatServiceServiceProxy, private CertificateGroupStatusServiceServiceProxy : CertificateGroupStatusServiceServiceProxy, private _permissionChecker: PermissionCheckerService) {
    super(injector, dataservice)
    this.group = "mat";
   }
  
  ngOnInit() {
    super.ngOnInit();
    if(this._permissionChecker.isGranted("Pages.Mat.Create")){
      this.isEditable3 = true;
    }
   
  }
  save(): void {
    const inputmat1s : CreateMedicationKeyResultDto[] = [];
    const item1 = new CreateMedicationKeyResultDto(
      {
        key: 'mat_checkbox_bth',
        value:  this.mat1.mat_checkbox_bth|| '',
        certificateId: this.certificateId,  
        group: this.group,
      }
    );const item2 = new CreateMedicationKeyResultDto(
      {
        key: 'mat_checkbox_mumau_all',
        value:  this.mat1.mat_checkbox_mumau_all|| '',
        certificateId: this.certificateId,
        group: this.group,
      }
    );const item3 = new CreateMedicationKeyResultDto(
      {
        key: 'mat_checkbox_mumau_do',
        value:  this.mat1.mat_checkbox_mumau_do|| '',
        certificateId: this.certificateId,
        group: this.group,
      }
    );const item4 = new CreateMedicationKeyResultDto(
      {
        key: 'mat_checkbox_mumau_vang',
        value:  this.mat1.mat_checkbox_mumau_vang|| '',
        certificateId: this.certificateId,
        group: this.group,
      }
    );const item5 = new CreateMedicationKeyResultDto(
      {
        key: 'mat_checkbox_mumau_xanh',
        value:  this.mat1.mat_checkbox_mumau_xanh|| '',
        certificateId: this.certificateId,
        group: this.group,
      }
    );const item6 = new CreateMedicationKeyResultDto(
      {
        key: 'mat_radio_thitruong_dung',
        value:  this.mat1.mat_radio_thitruong_dung|| '',
        certificateId: this.certificateId,
        group: this.group,
      }
    );const item7 = new CreateMedicationKeyResultDto(
      {
        key: 'mat_radio_thitruong_ngang',
        value:  this.mat1.mat_radio_thitruong_ngang|| '',
        certificateId: this.certificateId,
        group: this.group,
      }
    );const item8 = new CreateMedicationKeyResultDto(
      {
        key: 'mat_text_2m_ck',
        value:  this.mat1.mat_text_2m_ck|| '',
        certificateId: this.certificateId,
        group: this.group,
      }
    );const item9 = new CreateMedicationKeyResultDto(
      {
        key: 'mat_text_2m_kk',
        value:  this.mat1.mat_text_2m_kk|| '',
        certificateId: this.certificateId,
        group: this.group,
      }
    );const item15 = new CreateMedicationKeyResultDto(
      {
        key: 'mat_text_cbvm',
        value:  this.mat1.mat_text_cbvm|| '',
        certificateId: this.certificateId,
        group: this.group,
      }
    );const item10 = new CreateMedicationKeyResultDto(
      {
        key: 'mat_text_ck_mp',
        value:  this.mat1.mat_text_ck_mp|| '',
        certificateId: this.certificateId,
        group: this.group,
      }
    );const item11 = new CreateMedicationKeyResultDto(
      {
        key: 'mat_text_ck_mt',
        value:  this.mat1.mat_text_ck_mt|| '',
        certificateId: this.certificateId,
        group: this.group,
      }
    );const item12 = new CreateMedicationKeyResultDto(
      {
        key: 'mat_text_kk_mp',
        value:  this.mat1.mat_text_kk_mp|| '',
        certificateId: this.certificateId,
        group: this.group,
      }
    );const item13 = new CreateMedicationKeyResultDto(
      {
        key: 'mat_text_kk_mt',
        value:  this.mat1.mat_text_kk_mt|| '',
        certificateId: this.certificateId,
        group: this.group,
      }
    );
    const item14 = new CreateMedicationKeyResultDto(
      {
        key: 'mat_text_mat_ketluan',
        value:  this.mat1.mat_text_mat_ketluan||'',
        certificateId: this.certificateId,
        group: this.group,
      }
    );
    
    inputmat1s.push(item1);
    inputmat1s.push(item2);
    inputmat1s.push(item3);
    inputmat1s.push(item4);
    inputmat1s.push(item5);
    inputmat1s.push(item6);
    inputmat1s.push(item7);
    inputmat1s.push(item8);
    inputmat1s.push(item9);
    inputmat1s.push(item10);
    inputmat1s.push(item11);
    inputmat1s.push(item12);
    inputmat1s.push(item13);
    inputmat1s.push(item14);
    inputmat1s.push(item15);
    if(this.status == true){
      this.khoaMatServiceServiceProxy.updateOrInsert(inputmat1s).subscribe(
        () => {
          this.notify.info(this.l('SavedSuccessfully.'));
          this.dataservice.refreshData(this.certificateId);
        },
      );
    }else{
      this.khoaMatServiceServiceProxy.createList(inputmat1s).subscribe(
        () => {
          this.notify.info(this.l('SavedSuccessfully.'));
          this.dataservice.refreshData(this.certificateId);
        },
      );
    }
  }
}
