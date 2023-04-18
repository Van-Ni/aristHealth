import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '@app/services/data.service';
import { LoadingService } from '@app/services/loader/loading.service';
import { AppComponentBase } from '@shared/app-component-base';
import { PagedRequestDto } from '@shared/paged-listing-component-base';
import { CertificateGroupStatusDtoPagedResultDto, CertificateDto, CertificateServiceServiceProxy, GroupStatusServiceServiceProxy, KetLuanServicesServiceProxy, ApproveServiceServiceProxy, CertificateGroupStatusDto, UpdateCertificateGroupStatusDto } from '@shared/service-proxies/service-proxies';
import { ClinicalExaminationModel } from '../driver-health-check/clinical-examination1/clinical-examination1.component';
export interface Du18Model{
  tuanhoan: CertificateGroupStatusDto,
  hohap: CertificateGroupStatusDto,
  tieuhoa: CertificateGroupStatusDto,
  thantietnieu: CertificateGroupStatusDto,
  coxuongkhop: CertificateGroupStatusDto,
  thankinh: CertificateGroupStatusDto,
  tamthan: CertificateGroupStatusDto,
  ngoaikhoa: CertificateGroupStatusDto,
  thaisan: CertificateGroupStatusDto,
  mat: CertificateGroupStatusDto,
  taimuihong: CertificateGroupStatusDto,
  ranghammat: CertificateGroupStatusDto,
  dalieu: CertificateGroupStatusDto,
  xetnghiemmau: CertificateGroupStatusDto,
  xetnghiemnuoctieu: CertificateGroupStatusDto,
  chandoanhinhanh: CertificateGroupStatusDto,
  khamtheluc: CertificateGroupStatusDto,
  ketluan: CertificateGroupStatusDto,

}
@Component({
  selector: 'app-du18',
  templateUrl: './du18.component.html',
  styleUrls: ['./du18.component.css']
})
export class Du18Component extends AppComponentBase implements OnInit {
  isProfile1 = false;
  isTSBCDTKSK1 =true;
  isKhamTheLuc1 = true;
  isKhamLamSan1= true;
  isKhamCanLamSan1 = true;
  isKetLuan1 = true;
  request: PagedRequestDto;
  certificateStatusResult : CertificateGroupStatusDtoPagedResultDto ;
  profile: CertificateDto;

  dataModel: Du18Model;
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
        tuanhoan: this.certificateStatusResult.items.find(i=>i.group=="tuanhoan"),
        hohap: this.certificateStatusResult.items.find(i=>i.group=="hohap"),
        tieuhoa: this.certificateStatusResult.items.find(i=>i.group=="tieuhoa"),
        thantietnieu: this.certificateStatusResult.items.find(i=>i.group=="thantietnieu"),
        coxuongkhop: this.certificateStatusResult.items.find(i=>i.group=="coxuongkhop"),
        thankinh: this.certificateStatusResult.items.find(i=>i.group=="thankinh"),
        tamthan: this.certificateStatusResult.items.find(i=>i.group=="tamthan"),
        ngoaikhoa: this.certificateStatusResult.items.find(i=>i.group=="ngoaikhoa"),
        thaisan: this.certificateStatusResult.items.find(i=>i.group=="thaisan"),
        mat: this.certificateStatusResult.items.find(i=>i.group=="mat"),
        taimuihong: this.certificateStatusResult.items.find(i=>i.group=="taimuihong"),
        ranghammat: this.certificateStatusResult.items.find(i=>i.group=="ranghammat"),
        dalieu: this.certificateStatusResult.items.find(i=>i.group=="dalieu"),
        xetnghiemmau: this.certificateStatusResult.items.find(i=>i.group=="xetnghiemmau"),
        xetnghiemnuoctieu: this.certificateStatusResult.items.find(i=>i.group=="xetnghiemnuoctieu"),
        chandoanhinhanh: this.certificateStatusResult.items.find(i=>i.group=="chandoanhinhanh"),
        khamtheluc: this.certificateStatusResult.items.find(i=>i.group=="khamtheluc"),
        ketluan: this.certificateStatusResult.items.find(i=>i.group=="ketluan"),
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


