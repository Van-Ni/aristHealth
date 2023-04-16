import { AfterContentInit, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '@app/services/data.service';
import { LoadingService } from '@app/services/loader/loading.service';
import { IPagedResultDto, PagedRequestDto } from '@shared/paged-listing-component-base';
import {  CertificateDto, CertificateGroupStatusDtoPagedResultDto, CertificateGroupStatusServiceServiceProxy, CertificateServiceServiceProxy, CreateCertificateGroupStatusDto, GetDataServiceServiceProxy,  } from '@shared/service-proxies/service-proxies';
export class MedicationKeyResultDtoPagedResultViewModel{
 id: string;
 certificateId: string;
 key: string;
 value: string;
 group: string;
}
export class CertificateGroupStatusViewModel{
  id: string;
  certificateId: string;
  status: boolean;
  group: string;
  userId: number;
  fullName: string;
}
@Component({
  selector: 'app-driver-health-check',
  templateUrl: './driver-health-check.component.html',
  styleUrls: ['./driver-health-check.component.css']
})
export class DriverHealthCheckComponent implements AfterContentInit {
  isProfile1 = false;
  isTSBCDTKSK1 =true;
  isKhamTheLuc1 = true;
  isKhamLamSan1= true;
  isKhamCanLamSan1 = true;
  isKetLuan1 = true;
  request: PagedRequestDto;
  certificateStatusResult:CertificateGroupStatusDtoPagedResultDto ;
  profile: CertificateDto;
  constructor(public loader: LoadingService, private dataService: DataService,private certificateServiceServiceProxy: CertificateServiceServiceProxy,private certificateGroupStatusServiceServiceProxy: CertificateGroupStatusServiceServiceProxy,private getDataServiceServiceProxy: GetDataServiceServiceProxy,private route: ActivatedRoute) { }

  ngAfterContentInit() {
    console.log(this.route.snapshot.params['id']);
    this.dataService.getAllKeyData().subscribe((result: CertificateGroupStatusDtoPagedResultDto) => {
      if(!result) return;
      console.log("Refresh data")
      this.certificateStatusResult = result;
    });
    this.dataService.getGroupData()
      .subscribe((result: CertificateGroupStatusDtoPagedResultDto) =>{
     this.certificateStatusResult = result;
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
  save(entity :CreateCertificateGroupStatusDto){
    //Group service insert or update
  }
}


