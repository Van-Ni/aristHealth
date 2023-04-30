import { Component, Injector, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { HistoryExportServiceServiceProxy, CertificateServiceServiceProxy, CertificateGroupStatusServiceServiceProxy } from '@shared/service-proxies/service-proxies';
import * as moment from 'moment';
import { BsModalRef } from 'ngx-bootstrap/modal';
export class ExportDto{
  loaibaocao : number;
  status: number;
  dateFrom= new Date;
  dateTo= new Date;
}
@Component({
  selector: 'app-create-export',
  templateUrl: './create-export.component.html',
  styleUrls: ['./create-export.component.css']
})
export class CreateExportComponent extends AppComponentBase
implements OnInit{
  saving = false;
  exportDto : ExportDto;
  constructor(
    public bsModalRef: BsModalRef,
    private injector: Injector,
    private historyExportService:HistoryExportServiceServiceProxy,
    private _certificatesService: CertificateServiceServiceProxy,
    private _certificateGrService: CertificateGroupStatusServiceServiceProxy,
  ) {
    super(injector);
  }
  ngOnInit() {
    this.exportDto = new ExportDto();
  }
  save(): void {
    this.saving = true;
    if(this.exportDto.loaibaocao == 1)
    {
      this.ExportData();
      this.saving = false;
    }
    else if(this.exportDto.loaibaocao == 2){
      this.ExportData3();
      this.saving = false;

    }else if(this.exportDto.loaibaocao == 3){
      this.ExportData1();
      this.saving = false;

    }else{
      console.log("error");
      
    }
  }
  ExportData(): void {
    this._certificatesService
      .getExportCertificateList(
        this.getBegin(this.exportDto.dateFrom),
        this.getEnd(this.exportDto.dateTo),
        this.exportDto.status,
      )
      .subscribe(
        (response: any) => {
          console.log(response);
  
          if (response) {
            // Check if the response body is not null or undefined
            const url = URL.createObjectURL(response);
            const link = document.createElement("a");
            link.href = url;
            link.download = "BaoCao.xlsx";
            link.target = "_blank";
            link.click();
          } else {
            // Handle null or undefined response body
            console.error("Response body is null or undefined");
          }
        },
        (error) => {
          // Handle error
          console.error(error);
        }
      );
  }
  ExportData1(): void{
    this._certificateGrService
      .getExportCertificateMaTuyList(
        this.getBegin(this.exportDto.dateFrom),
        this.getEnd(this.exportDto.dateTo),
        this.exportDto.status,
      )
      .subscribe(
        (response: any) => {
          console.log(response);
  
          if (response) {
            // Check if the response body is not null or undefined
            const url = URL.createObjectURL(response);
            const link = document.createElement("a");
            link.href = url;
            link.download = "BaoCaoXetNghiemMaTuy.xlsx";
            link.target = "_blank";
            link.click();
          } else {
            // Handle null or undefined response body
            console.error("Response body is null or undefined");
          }
        },
        (error) => {
          // Handle error
          console.error(error);
        }
      );
  }
  ExportData3(): void{
    this._certificateGrService
    .getExportCertificate3List(
      this.getBegin(this.exportDto.dateFrom),
      this.getEnd(this.exportDto.dateTo),
      this.exportDto.status,
    )
    .subscribe(
      (response: any) => {
        console.log(response);
  
        if (response) {
          // Check if the response body is not null or undefined
          const url = URL.createObjectURL(response);
          const link = document.createElement("a");
          link.href = url;
          link.download = "BaoCaoXetNghiem.xlsx";
          link.target = "_blank";
          link.click();
        } else {
          // Handle null or undefined response body
          console.error("Response body is null or undefined");
        }
      },
      (error) => {
        // Handle error
        console.error(error);
      }
    );
  }
  getDateFrom(datestart: any) {
    this.exportDto.dateFrom = datestart;
  }
  getDateTo(dateend: any) {
    this.exportDto.dateTo = dateend;
  }
  getBegin = (date: Date) =>
  moment(new Date(date.getFullYear(), date.getMonth(), date.getDate()));
  getEnd = (date: Date) =>
  moment(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1));
}
