import { Component, Injector, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CreateMedicationKeyResultDto } from '@shared/service-proxies/service-proxies';
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
  sacgiac: string;
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
  constructor(private injector: Injector) {
    super(injector)
    
   }

  ngOnInit() {
  }
  save(): void {
    console.log(this.mat1);
    console.log(this.appSession.userId);
    const item1 = new CreateMedicationKeyResultDto(
      {
        key: 'M_KK_MT',
        value:  this.mat1.mot_khongkinh_mattrai,
        certificateId: '1073D4CE-09DB-4B30-B4A6-713037CB94C2',
        userId:  this.appSession.userId
      }
    );const item2 = new CreateMedicationKeyResultDto(
      {
        key: 'M_KK_MP',
        value:  this.mat1.mot_khongkinh_matphai,
        certificateId: '1073D4CE-09DB-4B30-B4A6-713037CB94C2',
        userId:  this.appSession.userId
      }
    );const item3 = new CreateMedicationKeyResultDto(
      {
        key: 'M_CK_MT',
        value:  this.mat1.mot_cokinh_mattrai,
        certificateId: '1073D4CE-09DB-4B30-B4A6-713037CB94C2',
        userId:  this.appSession.userId
      }
    );const item4 = new CreateMedicationKeyResultDto(
      {
        key: 'M_CK_MP',
        value:  this.mat1.mot_cokinh_matphai,
        certificateId: '1073D4CE-09DB-4B30-B4A6-713037CB94C2',
        userId:  this.appSession.userId
      }
    );const item5 = new CreateMedicationKeyResultDto(
      {
        key: 'H_CK',
        value:  this.mat1.hai_cokinh,
        certificateId: '1073D4CE-09DB-4B30-B4A6-713037CB94C2',
        userId:  this.appSession.userId
      }
    );const item6 = new CreateMedicationKeyResultDto(
      {
        key: 'H_KK',
        value:  this.mat1.hai_khongkinh,
        certificateId: '1073D4CE-09DB-4B30-B4A6-713037CB94C2',
        userId:  this.appSession.userId
      }
    );const item7 = new CreateMedicationKeyResultDto(
      {
        key: 'TT_N',
        value:  this.mat1.thitruong_ngang,
        certificateId: '1073D4CE-09DB-4B30-B4A6-713037CB94C2',
        userId:  this.appSession.userId
      }
    );const item8 = new CreateMedicationKeyResultDto(
      {
        key: 'TT_D',
        value:  this.mat1.thitruong_dung,
        certificateId: '1073D4CE-09DB-4B30-B4A6-713037CB94C2',
        userId:  this.appSession.userId
      }
    );const item9 = new CreateMedicationKeyResultDto(
      {
        key: 'SG',
        value:  this.mat1.sacgiac,
        certificateId: '1073D4CE-09DB-4B30-B4A6-713037CB94C2',
        userId:  this.appSession.userId
      }
    );const item10 = new CreateMedicationKeyResultDto(
      {
        key: 'MauDo',
        value:  this.mat1.mumau_do,
        certificateId: '1073D4CE-09DB-4B30-B4A6-713037CB94C2',
        userId:  this.appSession.userId
      }
    );const item11 = new CreateMedicationKeyResultDto(
      {
        key: 'MauVang',
        value:  this.mat1.mumau_vang,
        certificateId: '1073D4CE-09DB-4B30-B4A6-713037CB94C2',
        userId:  this.appSession.userId
      }
    );const item12 = new CreateMedicationKeyResultDto(
      {
        key: 'MauXanhLaCay',
        value:  this.mat1.mumau_xanhlacay,
        certificateId: '1073D4CE-09DB-4B30-B4A6-713037CB94C2',
        userId:  this.appSession.userId
      }
    );const item13 = new CreateMedicationKeyResultDto(
      {
        key: 'CBVMat',
        value:  this.mat1.cacbenhvemat,
        certificateId: '1073D4CE-09DB-4B30-B4A6-713037CB94C2',
        userId:  this.appSession.userId
      }
    );const item14 = new CreateMedicationKeyResultDto(
      {
        key: 'KL',
        value:  this.mat1.ketluan,
        certificateId: '1073D4CE-09DB-4B30-B4A6-713037CB94C2',
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
    console.log(this.inputmat1s);
    
  }
}
