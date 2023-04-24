import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '@app/services/data.service';
import { LoadingService } from '@app/services/loader/loading.service';
import { PagedRequestDto } from '@shared/paged-listing-component-base';
import { ApproveServiceServiceProxy, CertificateDto, CertificateGroupStatusDto, CertificateGroupStatusDtoPagedResultDto, CertificateServiceServiceProxy, CreateCertificateGroupStatusDto, KetLuanServicesServiceProxy, PDFServiceServiceProxy, UpdateCertificateGroupStatusDto, } from '@shared/service-proxies/service-proxies';
import { ClinicalExaminationModel } from './clinical-examination1/clinical-examination1.component';
import { GroupStatusServiceServiceProxy } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';
import { error } from 'console';
import { DefaultModel } from '../share/KetLuanPhanLoai/KetLuanPhanLoai.component';
import { finalize } from 'rxjs';
@Component({
  selector: 'app-driver-health-check',
  templateUrl: './driver-health-check.component.html',
  styleUrls: ['./driver-health-check.component.css']
})
export class DriverHealthCheckComponent extends AppComponentBase implements OnInit {
  isPrint = true;
  print = "In";
  request: PagedRequestDto;
  certificateStatusResult: CertificateGroupStatusDtoPagedResultDto;
  profile: CertificateDto;

  dataModel: ClinicalExaminationModel
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
  laixeModel: DefaultModel = {
    ketluanTitle: "Kết luận",
    phanloaiTitle: "Nội dung",
    optionsKetLuan: [],
    optionsPhanLoai: []
  }
  ngOnInit() {
    this.dataService.getAllKeyData().subscribe((result: CertificateGroupStatusDtoPagedResultDto) => {
      if (!result) return;
      this.certificateStatusResult = result;
      this.dataModel = {
        thankinh: this.certificateStatusResult.items.find(i => i.group == "thankinh"),
        tamthan: this.certificateStatusResult.items.find(i => i.group == "tamthan"),
        coxuongkhop: this.certificateStatusResult.items.find(i => i.group == "coxuongkhop"),
        hohap: this.certificateStatusResult.items.find(i => i.group == "hohap"),
        ketluan: this.certificateStatusResult.items.find(i => i.group == "ketluan"),
        mat: this.certificateStatusResult.items.find(i => i.group == "mat"),
        taimuihong: this.certificateStatusResult.items.find(i => i.group == "taimuihong"),
        thaisan: this.certificateStatusResult.items.find(i => i.group == "thaisan"),
        timmach: this.certificateStatusResult.items.find(i => i.group == "timmach"),
        noitiet: this.certificateStatusResult.items.find(i => i.group == "noitiet"),
        xetnghiemkhac: this.certificateStatusResult.items.find(i => i.group == "xetnghiemkhac"),
        xetnghiemmatuyvamau: this.certificateStatusResult.items.find(i => i.group == "xetnghiemmatuyvamau"),
        tdv: this.certificateStatusResult.items.find(i => i.group == "tdv"),
      }
      console.log(this.dataModel);

    });
    this.certificateServiceServiceProxy.getProfile(this.route.snapshot.params['id'])
      .subscribe((result: CertificateDto) => {
        this.profile = result;
      })
    this.getAllData();

  }
  getAllData() {

    this.dataService.refreshData(this.route.snapshot.params['id']);

  }
  save = (entity: CertificateGroupStatusDto) => {
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
  saveKL = (entity: CertificateGroupStatusDto) => {
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
    abp.message.confirm(
      this.l('HuyKetLuan'),
      undefined,
      (result: boolean) => {
        if (result) {
          this.ketluanService.huyKetLuan(inputEntity)
            .pipe(
              finalize(() => {
                abp.notify.success(this.l('SuccessfullyDeleted'));
              })
            )
            .subscribe(() => {});
        }
      }
    );

  }
  // huyketluan = (entity: CertificateGroupStatusDto) => {
  //   const inputEntity = new UpdateCertificateGroupStatusDto();
  //   inputEntity.id = entity.id;
  //   inputEntity.certificateId = entity.certificateId;
  //   inputEntity.content = entity.content;
  //   inputEntity.group = entity.group;
  //   inputEntity.status = entity.status;
  //   this.ketluanService.huyKetLuan(inputEntity).subscribe(
  //     () => {
  //       this.notify.info('Lưu thành công.');
  //       this.getAllData();
  //     },
  //     () => {
  //       console.log("error");
  //     }
  //   )
  // }
  approve = () => {
    this.approveService.approve(this.route.snapshot.params['id']).subscribe(
      () => {
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
            .subscribe(() => {
              this.getAllData();
             });
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
            link.download = 'filled_certificate.pdf';
            link.target = '_blank';
            link.click();
          } else {
            // Handle null or undefined response body
            console.error('Response body is null or undefined');
          }
        },
        error => {
          // Handle error
          this.print = "In";
          this.isPrint = true;
          console.error(error);
        }
      );
  }
}


