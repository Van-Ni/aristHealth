import { Component, Injector, Input, OnInit } from '@angular/core';
import { DataService } from '@app/services/data.service';
import { CertificateGroupStatusDto, CertificateGroupStatusServiceServiceProxy, CreateCertificateGroupStatusDto, KeyValues, KhoaMatServiceServiceProxy, Values } from '@shared/service-proxies/service-proxies';
import { PermissionCheckerService } from 'abp-ng2-module';
import {CertificateKeyValueComponentBase} from '../../../../manager/base-certificate';

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
  setViewModel(model: any) {    
    for (const key in this.mat1) {
      if (Object.prototype.hasOwnProperty.call(this.mat1, key)) {
        const item = model.items.find(i => i.key === key);
        if(item){
          this.mat1[key] = item.value;
        }
      }
    }
  }
  
  @Input() Data: any;
  mat1: Mat1ViewModel = {
    mat_checkbox_bth: "bth",
    mat_radio_thitruong_dung: "bth",
    mat_radio_thitruong_ngang: "bth",
    mat_text_kk_mt: "10/10",
    mat_text_kk_mp: "10/10",
    mat_text_ck_mp: "10/10",
    mat_text_ck_mt: "10/10",
    mat_text_2m_ck: "10/10",
    mat_text_2m_kk: "10/10",
    mat_text_cbvm: "Không",
    mat_text_mat_ketluan: "Đủ sức khỏe",
    mat_checkbox_mumau_all: '',
    mat_checkbox_mumau_do: '',
    mat_checkbox_mumau_vang: '',
    mat_checkbox_mumau_xanh: ''
  };
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
    const data  =  {
      keys: {
        "mat_checkbox_bth": new Values({ value: this.mat1.mat_checkbox_bth }),
        "mat_checkbox_mumau_all": new Values({ value: this.mat1.mat_checkbox_mumau_all }),
        "mat_checkbox_mumau_do": new Values({ value: this.mat1.mat_checkbox_mumau_do }),
        "mat_checkbox_mumau_vang": new Values({ value: this.mat1.mat_checkbox_mumau_vang }),
        "mat_checkbox_mumau_xanh": new Values({ value: this.mat1.mat_checkbox_mumau_xanh }),
        "mat_radio_thitruong_dung": new Values({ value: this.mat1.mat_radio_thitruong_dung }),
        "mat_radio_thitruong_ngang": new Values({ value: this.mat1.mat_radio_thitruong_ngang }),
        "mat_text_2m_ck": new Values({ value: this.mat1.mat_text_2m_ck }),
        "mat_text_2m_kk": new Values({ value: this.mat1.mat_text_2m_kk }),
        "mat_text_cbvm": new Values({ value: this.mat1.mat_text_cbvm }),
        "mat_text_ck_mp": new Values({ value: this.mat1.mat_text_ck_mp }),
        "mat_text_ck_mt": new Values({ value: this.mat1.mat_text_ck_mt }),
        "mat_text_kk_mp": new Values({ value: this.mat1.mat_text_kk_mp }),
        "mat_text_kk_mt": new Values({ value: this.mat1.mat_text_kk_mt }),
        "mat_text_mat_ketluan": new Values({ value: this.mat1.mat_text_mat_ketluan }),
      }
    };
    const input = new CreateCertificateGroupStatusDto(
      {
        userId : this.appSession.userId,
        certificateId: this.certificateId,
        group: this.group,
        status : false,
        content : new KeyValues(data),
      }
    );
    if(this.status == true){
      this.khoaMatServiceServiceProxy.updateOrInsert(input).subscribe(
        () => {
          this.notify.info(this.l('SavedSuccessfully.'));
          this.dataservice.refreshData(this.certificateId);
        },
      );
    }else{
      this.khoaMatServiceServiceProxy.createList(input).subscribe(
        () => {
          this.notify.info(this.l('SavedSuccessfully.'));
          this.dataservice.refreshData(this.certificateId);
        },
      );
    }
  }
}
