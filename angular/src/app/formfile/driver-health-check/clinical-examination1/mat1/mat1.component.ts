import { Component, Injector, Input, OnInit } from '@angular/core';
import { DataService } from '@app/services/data.service';
import { AppComponentBase } from '@shared/app-component-base';
import { CreateMedicationKeyResultDto, KhoaMatServiceServiceProxy } from '@shared/service-proxies/service-proxies';
import { PermissionCheckerService } from 'abp-ng2-module';
interface Mat1ViewModel {
  Mat_text_kk_mt: string;
  Mat_text_kk_mp: string;
  Mat_text_ck_mt: string;
  Mat_text_ck_mp: string;
  Mat_text_2m_ck: string;
  Mat_text_2m_kk: string;
  Mat_radio_thitruong_ngang: string;
  Mat_radio_thitruong_dung: string;
  Mat_checkbox_bth: string;
  Mat_checkbox_mumau_all: string;
  Mat_checkbox_mumau_do:string;
  Mat_checkbox_mumau_vang: string;
  Mat_checkbox_mumau_xanh: string;
  Mat_text_cbvm: string;
  Mat_text_mat_ketluan: string; 
}
@Component({
  selector: 'app-mat1',
  templateUrl: './mat1.component.html',
  styleUrls: ['./mat1.component.css']
})
export class Mat1Component extends AppComponentBase implements OnInit {
  
  @Input() Data: any;
  mat1 :Mat1ViewModel;  
  keys = [""];
  isEditable= false;
  constructor(private dataservice: DataService,private injector: Injector, private khoaMatServiceServiceProxy: KhoaMatServiceServiceProxy,  private _permissionChecker: PermissionCheckerService,) {
    super(injector)
   }

  ngOnInit() {
    if(this._permissionChecker.isGranted("Pages.Mat.Create")){
      this.isEditable = true;
      console.log(this.isEditable) 
    }
    console.log("testtttt", this.dataservice.getData())
    console.log("matt",this.mat1)
    // let object = Object.fromEntries(new Map(this.dataservice.getData().items.map(obj=>{
    //   return [obj.key, obj.value]
    // })));
    //   this.mat1 =   object as unknown as Mat1ViewModel;
      let object = Object.fromEntries(new Map(this.Data.items.map(obj=>{
      return [obj.key, obj.value]
    })));
      this.mat1 =   object as unknown as Mat1ViewModel;
      console.log("matt",this.mat1)
  }
  save(): void {
    
    console.log(this.mat1);
    console.log(this.appSession.userId);
    var inputmat1s : CreateMedicationKeyResultDto[] = [];
    for (const key in this.mat1) {
      if (Object.prototype.hasOwnProperty.call(this.mat1, key)) {
        const element = this.mat1[key];
        inputmat1s.push(new CreateMedicationKeyResultDto({
          key: key,
          value:  element,
          group: "Mat",
          certificateId: 'f4e1980b-40d9-49d5-9c59-7a364ced6253',
        }));        
      }
    }
    // const item1 = new CreateMedicationKeyResultDto(
    //   {
    //     key: 'Mat_text_kk_mt',
    //     value:  this.mat1.Mat_text_kk_mt,
    //     certificateId: 'f4e1980b-40d9-49d5-9c59-7a364ced6253',
    //     userId:  this.appSession.userId
    //   }
    // );const item2 = new CreateMedicationKeyResultDto(
    //   {
    //     key: 'Mat_text_kk_mp',
    //     value:  this.mat1.Mat_text_kk_mp,
    //     certificateId: 'f4e1980b-40d9-49d5-9c59-7a364ced6253',
    //     userId:  this.appSession.userId
    //   }
    // );const item3 = new CreateMedicationKeyResultDto(
    //   {
    //     key: 'm_ck_mt',
    //     value:  this.mat1.m_ck_mt,
    //     certificateId: 'f4e1980b-40d9-49d5-9c59-7a364ced6253',
    //     userId:  this.appSession.userId
    //   }
    // );const item4 = new CreateMedicationKeyResultDto(
    //   {
    //     key: 'm_ck_mp',
    //     value:  this.mat1.m_ck_mp,
    //     certificateId: 'f4e1980b-40d9-49d5-9c59-7a364ced6253',
    //     userId:  this.appSession.userId
    //   }
    // );const item5 = new CreateMedicationKeyResultDto(
    //   {
    //     key: 'h_ck',
    //     value:  this.mat1.h_ck,
    //     certificateId: 'f4e1980b-40d9-49d5-9c59-7a364ced6253',
    //     userId:  this.appSession.userId
    //   }
    // );const item6 = new CreateMedicationKeyResultDto(
    //   {
    //     key: 'h_kk',
    //     value:  this.mat1.h_kk,
    //     certificateId: 'f4e1980b-40d9-49d5-9c59-7a364ced6253',
    //     userId:  this.appSession.userId
    //   }
    // );const item7 = new CreateMedicationKeyResultDto(
    //   {
    //     key: 'tt_n',
    //     value:  this.mat1.tt_n,
    //     certificateId: 'f4e1980b-40d9-49d5-9c59-7a364ced6253',
    //     userId:  this.appSession.userId
    //   }
    // );const item8 = new CreateMedicationKeyResultDto(
    //   {
    //     key: 'tt_d',
    //     value:  this.mat1.tt_d,
    //     certificateId: 'f4e1980b-40d9-49d5-9c59-7a364ced6253',
    //     userId:  this.appSession.userId
    //   }
    // );const item9 = new CreateMedicationKeyResultDto(
    //   {
    //     key: 'radio_bth',
    //     value:  this.mat1.radio_bth,
    //     certificateId: 'f4e1980b-40d9-49d5-9c59-7a364ced6253',
    //     userId:  this.appSession.userId
    //   }
    // );const item15 = new CreateMedicationKeyResultDto(
    //   {
    //     key: 'mm_all',
    //     value:  this.mat1.mm_all,
    //     certificateId: 'f4e1980b-40d9-49d5-9c59-7a364ced6253',
    //     userId:  this.appSession.userId
    //   }
    // );const item10 = new CreateMedicationKeyResultDto(
    //   {
    //     key: 'mm_do',
    //     value:  this.mat1.mm_do,
    //     certificateId: 'f4e1980b-40d9-49d5-9c59-7a364ced6253',
    //     userId:  this.appSession.userId
    //   }
    // );const item11 = new CreateMedicationKeyResultDto(
    //   {
    //     key: 'mm_vang',
    //     value:  this.mat1.mm_vang,
    //     certificateId: 'f4e1980b-40d9-49d5-9c59-7a364ced6253',
    //     userId:  this.appSession.userId
    //   }
    // );const item12 = new CreateMedicationKeyResultDto(
    //   {
    //     key: 'mm_xanh',
    //     value:  this.mat1.mm_xanh,
    //     certificateId: 'f4e1980b-40d9-49d5-9c59-7a364ced6253',
    //     userId:  this.appSession.userId
    //   }
    // );const item13 = new CreateMedicationKeyResultDto(
    //   {
    //     key: 'cbvm',
    //     value:  this.mat1.cbvm,
    //     certificateId: 'f4e1980b-40d9-49d5-9c59-7a364ced6253',
    //     userId:  this.appSession.userId
    //   }
    // );const item14 = new CreateMedicationKeyResultDto(
    //   {
    //     key: 'kl',
    //     value:  this.mat1.kl,
    //     certificateId: 'f4e1980b-40d9-49d5-9c59-7a364ced6253',
    //     userId:  this.appSession.userId
    //   }
    // );
    // console.log(item1);
    
    // this.inputmat1s.push(item1);
    // this.inputmat1s.push(item2);
    // this.inputmat1s.push(item3);
    // this.inputmat1s.push(item4);
    // this.inputmat1s.push(item5);
    // this.inputmat1s.push(item6);
    // this.inputmat1s.push(item7);
    // this.inputmat1s.push(item8);
    // this.inputmat1s.push(item9);
    // this.inputmat1s.push(item10);
    // this.inputmat1s.push(item11);
    // this.inputmat1s.push(item12);
    // this.inputmat1s.push(item13);
    // this.inputmat1s.push(item14);
    // this.inputmat1s.push(item15);
    // console.log(this.inputmat1s);
    this.khoaMatServiceServiceProxy.createList(inputmat1s).subscribe(
      () => {
        
        this.notify.info(this.l('SavedSuccessfully.'));
      },
      
    );
  }
}
