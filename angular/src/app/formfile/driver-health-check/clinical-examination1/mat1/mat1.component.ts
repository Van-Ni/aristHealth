import { Component, Injector, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CreateMedicationKeyResultDto, MedicationKeyResultB2ServiceServiceProxy } from '@shared/service-proxies/service-proxies';
import { log } from 'console';
class Mat1ViewModel {
  mot_khongkinh_mattrai: string;
  mot_khongkinh_matphai: string;
  mot_cokinh_mattrai: string;
  mot_cokinh_matphai: string;
  hai_cokinh: string;
  hai_khongkinh: string;
  thitruong_ngang: string;
  thitruong_dung: string;
  bth: string;
  mumau_all: string;
  mumau_do:string;
  mumau_vang: string;
  mumau_xanhlacay: string;
  cacbenhvemat!: string;
  ketluan: string; 
}
@Component({
  selector: 'app-mat1',
  templateUrl: './mat1.component.html',
  styleUrls: ['./mat1.component.css']
})
export class Mat1Component extends AppComponentBase implements OnInit {
  mat1= new Mat1ViewModel();
  inputmat1 :CreateMedicationKeyResultDto;
  inputmat1s : CreateMedicationKeyResultDto[] = [];
  constructor(private injector: Injector, private medicationKeyResultServiceServiceProxy: MedicationKeyResultB2ServiceServiceProxy) {
    super(injector)
    
   }

  ngOnInit() {
  }
  save(): void {
    console.log(this.mat1);
    console.log(this.appSession.userId);
    const item1 = new CreateMedicationKeyResultDto(
      {
        key: 'm_kk_mt',
        value:  this.mat1.mot_khongkinh_mattrai,
        certificateId: 'f4e1980b-40d9-49d5-9c59-7a364ced6253',
        userId:  this.appSession.userId
      }
    );const item2 = new CreateMedicationKeyResultDto(
      {
        key: 'm_kk_mp',
        value:  this.mat1.mot_khongkinh_matphai,
        certificateId: 'f4e1980b-40d9-49d5-9c59-7a364ced6253',
        userId:  this.appSession.userId
      }
    );const item3 = new CreateMedicationKeyResultDto(
      {
        key: 'm_ck_mt',
        value:  this.mat1.mot_cokinh_mattrai,
        certificateId: 'f4e1980b-40d9-49d5-9c59-7a364ced6253',
        userId:  this.appSession.userId
      }
    );const item4 = new CreateMedicationKeyResultDto(
      {
        key: 'm_ck_mp',
        value:  this.mat1.mot_cokinh_matphai,
        certificateId: 'f4e1980b-40d9-49d5-9c59-7a364ced6253',
        userId:  this.appSession.userId
      }
    );const item5 = new CreateMedicationKeyResultDto(
      {
        key: 'h_ck',
        value:  this.mat1.hai_cokinh,
        certificateId: 'f4e1980b-40d9-49d5-9c59-7a364ced6253',
        userId:  this.appSession.userId
      }
    );const item6 = new CreateMedicationKeyResultDto(
      {
        key: 'h_kk',
        value:  this.mat1.hai_khongkinh,
        certificateId: 'f4e1980b-40d9-49d5-9c59-7a364ced6253',
        userId:  this.appSession.userId
      }
    );const item7 = new CreateMedicationKeyResultDto(
      {
        key: 'tt_n',
        value:  this.mat1.thitruong_ngang,
        certificateId: 'f4e1980b-40d9-49d5-9c59-7a364ced6253',
        userId:  this.appSession.userId
      }
    );const item8 = new CreateMedicationKeyResultDto(
      {
        key: 'tt_d',
        value:  this.mat1.thitruong_dung,
        certificateId: 'f4e1980b-40d9-49d5-9c59-7a364ced6253',
        userId:  this.appSession.userId
      }
    );const item9 = new CreateMedicationKeyResultDto(
      {
        key: 'radio_bth',
        value:  this.mat1.bth,
        certificateId: 'f4e1980b-40d9-49d5-9c59-7a364ced6253',
        userId:  this.appSession.userId
      }
    );const item15 = new CreateMedicationKeyResultDto(
      {
        key: 'mm_all',
        value:  this.mat1.mumau_all,
        certificateId: 'f4e1980b-40d9-49d5-9c59-7a364ced6253',
        userId:  this.appSession.userId
      }
    );const item10 = new CreateMedicationKeyResultDto(
      {
        key: 'mm_do',
        value:  this.mat1.mumau_do,
        certificateId: 'f4e1980b-40d9-49d5-9c59-7a364ced6253',
        userId:  this.appSession.userId
      }
    );const item11 = new CreateMedicationKeyResultDto(
      {
        key: 'mm_vang',
        value:  this.mat1.mumau_vang,
        certificateId: 'f4e1980b-40d9-49d5-9c59-7a364ced6253',
        userId:  this.appSession.userId
      }
    );const item12 = new CreateMedicationKeyResultDto(
      {
        key: 'mm_xanh',
        value:  this.mat1.mumau_xanhlacay,
        certificateId: 'f4e1980b-40d9-49d5-9c59-7a364ced6253',
        userId:  this.appSession.userId
      }
    );const item13 = new CreateMedicationKeyResultDto(
      {
        key: 'cbvm',
        value:  this.mat1.cacbenhvemat,
        certificateId: 'f4e1980b-40d9-49d5-9c59-7a364ced6253',
        userId:  this.appSession.userId
      }
    );const item14 = new CreateMedicationKeyResultDto(
      {
        key: 'kl',
        value:  this.mat1.ketluan,
        certificateId: 'f4e1980b-40d9-49d5-9c59-7a364ced6253',
        userId:  this.appSession.userId
      }
    );
    console.log(item1);
    
    this.inputmat1s.push(item1);
    this.inputmat1s.push(item2);
    this.inputmat1s.push(item3);
    this.inputmat1s.push(item4);
    this.inputmat1s.push(item5);
    this.inputmat1s.push(item6);
    this.inputmat1s.push(item7);
    this.inputmat1s.push(item8);
    this.inputmat1s.push(item9);
    this.inputmat1s.push(item10);
    this.inputmat1s.push(item11);
    this.inputmat1s.push(item12);
    this.inputmat1s.push(item13);
    this.inputmat1s.push(item14);
    this.inputmat1s.push(item15);
    console.log(this.inputmat1s);
    this.medicationKeyResultServiceServiceProxy.createList(this.inputmat1s).subscribe(
      () => {
        
        this.notify.info(this.l('SavedSuccessfully.'));
      },
      
    );
  }
}
