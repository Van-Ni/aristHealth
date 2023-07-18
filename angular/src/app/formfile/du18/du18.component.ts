import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '@app/services/data.service';
import { LoadingService } from '@app/services/loader/loading.service';
import { AppComponentBase } from '@shared/app-component-base';
import { PagedRequestDto } from '@shared/paged-listing-component-base';
import { CertificateGroupStatusDtoPagedResultDto, CertificateDto, CertificateServiceServiceProxy, GroupStatusServiceServiceProxy, KetLuanServicesServiceProxy, ApproveServiceServiceProxy, CertificateGroupStatusDto, UpdateCertificateGroupStatusDto, PDFServiceServiceProxy } from '@shared/service-proxies/service-proxies';
import { ClinicalExaminationModel } from '../driver-health-check/clinical-examination1/clinical-examination1.component';
import { DefaultModel } from '../share/KetLuanPhanLoai/KetLuanPhanLoai.component';
import { finalize } from 'rxjs';
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
  tdv: CertificateGroupStatusDto,
}
@Component({
  selector: 'app-du18',
  templateUrl: './du18.component.html',
  styleUrls: ['./du18.component.css']
})
export class Du18Component extends AppComponentBase implements OnInit {
  isPrint = true;
  print = "In";
  request: PagedRequestDto;
  certificateStatusResult : CertificateGroupStatusDtoPagedResultDto ;
  profile: CertificateDto;
  title:string = "Khám sức khỏe làm việc, học tập (trên 18 tuổi)";
  dataModel: Du18Model;
  constructor(public loader: LoadingService,
    private dataService: DataService,
    private certificateServiceServiceProxy: CertificateServiceServiceProxy,
    private route: ActivatedRoute,
    private groupStatusService: GroupStatusServiceServiceProxy,
    private PDFService: PDFServiceServiceProxy,
     private injecter: Injector,
     private ketluanService: KetLuanServicesServiceProxy, private approveService: ApproveServiceServiceProxy) {
      super(injecter)
     }
     du18Model: DefaultModel ={
      ketluanTitle : "Kết luận",
      phanloaiTitle: "Phân loại sức khỏe",
      optionsKetLuan :["Đủ sức khỏe học tập","Đủ sức khỏe làm việc","Đủ sức khỏe học tập và làm việc", "Đủ sức khỏe thi đấu thể thao", "Đủ sức khỏe làm việc phù hợp"],
      optionsPhanLoai: ["Loại I", "Loại II", "Loại III", "Loại IV", "Loại V"]
    }
    du18KlModel: DefaultModel ={
      ketluanTitle : "Kết luận",
      phanloaiTitle: "Phân loại sức khỏe",
      optionsKetLuan :["Đủ sức khỏe học tập","Đủ sức khỏe làm việc","Đủ sức khỏe học tập và làm việc", "Đủ sức khỏe thi đấu thể thao", "Đủ sức khỏe làm việc phù hợp"],
      optionsPhanLoai: ["Loại I  (Loại một)", "Loại II  (Loại hai)", "Loại III  (Loại ba)", "Loại IV  (Loại bốn)", "Loại V  (Loại năm)"]
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
        tdv: this.certificateStatusResult.items.find(i=>i.group=="tdv"),
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
      this.notify.info('Lưu thành công.');
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
      this.notify.info('Lưu thành công.');
      this.getAllData();
    },)
  }
  huyketluan = (entity :CertificateGroupStatusDto) =>{
    const inputEntity = new UpdateCertificateGroupStatusDto();
    inputEntity.id = entity.id;
    inputEntity.certificateId = entity.certificateId;
    inputEntity.content = entity.content;
    inputEntity.group = entity.group;
    inputEntity.status = entity.status;
    console.log("ss",inputEntity);

    this.ketluanService.huyKetLuan(inputEntity).subscribe(
      () => {
      this.notify.info('Lưu thành công.');
      this.getAllData();
      },
      ()=>{
        console.log("error");
      }
      )
  }
  approve =()=>{
    this.approveService.approve(this.route.snapshot.params['id']).subscribe(
      ()=>{
        this.notify.info('Lưu thành công.');
        this.getAllData();
      },
    )
  }
  unapprove = () => {
    abp.message.confirm(
      this.l('UnApprove'),
      undefined,
      (result: boolean) => {
        if (result) {
          this.approveService.unApprove(this.route.snapshot.params['id'])
            .pipe(
              finalize(() => {
                abp.notify.success(this.l('SuccessfullyDeleted'));
              })
            )
            .subscribe(() => { });
        }
      }
    );

  }
  Print = () =>{
    this.isPrint = false;
    this.print = "Đang in";
    this.PDFService.getCertificatePdfPrintedFile(this.route.snapshot.params['id']).subscribe(
      (response: any) => {
        console.log(response);
        this.isPrint = true;
        this.print = "In";
        if (response) { // Check if the response body is not null or undefined
          //const blob = new Blob([response.body], { type: 'application/pdf' });
          const url = URL.createObjectURL(response);
          const link = document.createElement('a');
          link.href = url;
          link.download = this.profile.clientInfo.fullName.normalize("NFC").replace(/\p{Diacritic}/gu, "").replace(/ /g, '_'); +'.pdf';
          link.target = '_blank';
          link.click();
        } else {
          // Handle null or undefined response body
          console.error('Response body is null or undefined');
        }
      },
      error => {
        // Handle error
        this.isPrint = true;
        this.print = "In";
        console.error(error);
      }
    );
}
}


