import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '@app/services/data.service';
import { LoadingService } from '@app/services/loader/loading.service';
import { PagedRequestDto } from '@shared/paged-listing-component-base';
import {  ApproveServiceServiceProxy, CertificateDto, CertificateGroupStatusDto, CertificateGroupStatusDtoPagedResultDto, CertificateServiceServiceProxy, CreateCertificateGroupStatusDto, KetLuanServicesServiceProxy, UpdateCertificateGroupStatusDto,  } from '@shared/service-proxies/service-proxies';
import { ClinicalExaminationModel } from './clinical-examination1/clinical-examination1.component';
import { GroupStatusServiceServiceProxy } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';
@Component({
  selector: 'app-driver-health-check',
  templateUrl: './driver-health-check.component.html',
  styleUrls: ['./driver-health-check.component.css']
})
export class DriverHealthCheckComponent extends AppComponentBase implements OnInit {
  isProfile1 = false;
  isTSBCDTKSK1 =true;
  isKhamTheLuc1 = true;
  isKhamLamSan1= true;
  isKhamCanLamSan1 = true;
  isKetLuan1 = true;
  request: PagedRequestDto;
  certificateStatusResult : CertificateGroupStatusDtoPagedResultDto ;
  profile: CertificateDto;

  dataModel: ClinicalExaminationModel
  constructor(public loader: LoadingService, 
    private dataService: DataService,
    private certificateServiceServiceProxy: CertificateServiceServiceProxy,
    private route: ActivatedRoute, 
    private groupStatusService: GroupStatusServiceServiceProxy,
     private injecter: Injector,
     private ketluanService: KetLuanServicesServiceProxy, private approveService: ApproveServiceServiceProxy) {
      super(injecter)
     }

  ngOnInit() {
      this.dataService.getAllKeyData().subscribe((result: CertificateGroupStatusDtoPagedResultDto) => {
      if(!result) return;
      this.certificateStatusResult = result;
      this.dataModel = {
        thankinh: this.certificateStatusResult.items.find(i=>i.group=="thankinh"),
        tamthan: this.certificateStatusResult.items.find(i=>i.group=="tamthan"),
        coxuongkhop: this.certificateStatusResult.items.find(i=>i.group=="coxuongkhop"),
        hohap: this.certificateStatusResult.items.find(i=>i.group=="hohap"),
        ketluan: this.certificateStatusResult.items.find(i=>i.group=="ketluan"),
        mat: this.certificateStatusResult.items.find(i=>i.group=="mat"),
        taimuihong: this.certificateStatusResult.items.find(i=>i.group=="taimuihong"),
        thaisan: this.certificateStatusResult.items.find(i=>i.group=="thaisan"),
        timmach: this.certificateStatusResult.items.find(i=>i.group=="timmach"),
        noitiet: this.certificateStatusResult.items.find(i=>i.group=="noitiet"),
        xetnghiemkhac: this.certificateStatusResult.items.find(i=>i.group=="xetnghiemkhac"),
        xetnghiemmatuyvamau: this.certificateStatusResult.items.find(i=>i.group=="xetnghiemmatuyvamau"),
      }
      console.log(this.dataModel);
      
    });
    this.certificateServiceServiceProxy.getProfile(this.route.snapshot.params['id'])
    .subscribe((result:CertificateDto)=>{
      this.profile=result;
    })
    this.getAllData();
  
  }
  getAllData(){

    this.dataService.refreshData(this.route.snapshot.params['id']);
    
  }
  save = (entity :CertificateGroupStatusDto)=>{
    //Group service insert or update
    // 
    const inputEntity = new UpdateCertificateGroupStatusDto();
    inputEntity.id = entity.id;
    inputEntity.certificateId = entity.certificateId;
    inputEntity.content = entity.content;
    inputEntity.group = entity.group;
    inputEntity.status = entity.status;
    console.log(inputEntity);
    this.groupStatusService.updateOrInsert(inputEntity).subscribe(
      () => {
      this.notify.info('SavedSuccessfully.');
      this.getAllData();
    },)
  }
  saveKL = (entity :CertificateGroupStatusDto)=>{
    const inputEntity = new UpdateCertificateGroupStatusDto();
    inputEntity.id = entity.id;
    inputEntity.certificateId = entity.certificateId;
    inputEntity.content = entity.content;
    inputEntity.group = entity.group;
    inputEntity.status = entity.status;
    console.log(inputEntity);
    this.ketluanService.updateOrInsert(inputEntity).subscribe(
      () => {
      this.notify.info('SavedSuccessfully.');
      this.getAllData();
    },)
  }
  approve =()=>{
    console.log();
    this.approveService.approve(this.route.snapshot.params['id']).subscribe(
      ()=>{
        this.notify.info('SavedSuccessfully.');
        this.getAllData();
      },
    )
  }

}


