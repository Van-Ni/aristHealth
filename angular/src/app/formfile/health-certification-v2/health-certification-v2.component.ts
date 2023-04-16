import { AfterContentInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '@app/services/data.service';
import { LoadingService } from '@app/services/loader/loading.service';
import { PagedRequestDto, IPagedResultDto } from '@shared/paged-listing-component-base';
import { CertificateServiceServiceProxy, CertificateGroupStatusServiceServiceProxy, GetDataServiceServiceProxy, CertificateGroupStatusDtoPagedResultDto, CertificateDto } from '@shared/service-proxies/service-proxies';
import { MedicationKeyResultDtoPagedResultViewModel } from '../driver-health-check/driver-health-check.component';

@Component({
  selector: 'app-health-certification-v2',
  templateUrl: './health-certification-v2.component.html',
  styleUrls: ['./health-certification-v2.component.css']
})
export class HealthCertificationV2Component implements AfterContentInit {
  request: PagedRequestDto;
  certificateStatusResult:CertificateGroupStatusDtoPagedResultDto ;
  profile: CertificateDto;
  constructor(public loader: LoadingService, private dataService: DataService,private certificateServiceServiceProxy: CertificateServiceServiceProxy,private certificateGroupStatusServiceServiceProxy: CertificateGroupStatusServiceServiceProxy,private getDataServiceServiceProxy: GetDataServiceServiceProxy,private route: ActivatedRoute) { }

  ngAfterContentInit() {
    console.log(this.route.snapshot.params['id']);
    this.dataService.getAllKeyData().subscribe((result: CertificateGroupStatusDtoPagedResultDto) => {
      console.log("Refresh data")
      this.certificateStatusResult = result;
      // this.medicationKeyResult = {
      //   items: result.items?.map(x => {
      //     const medicationKeyResultDtoPagedResultViewModel = new MedicationKeyResultDtoPagedResultViewModel();
      //     medicationKeyResultDtoPagedResultViewModel.id = x.id;
      //     medicationKeyResultDtoPagedResultViewModel.certificateId = x.certificateId;
      //     medicationKeyResultDtoPagedResultViewModel.key = x.key;
      //     medicationKeyResultDtoPagedResultViewModel.value = x.value;
      //     medicationKeyResultDtoPagedResultViewModel.group = x.group;
      //     return medicationKeyResultDtoPagedResultViewModel;
      //   }),
      //   totalCount: result.totalCount
      // };
      // this.dataService.setData(this.route.snapshot.params['id']);
    });
    this.dataService.getGroupData()
      .subscribe((result: CertificateGroupStatusDtoPagedResultDto) =>{
     this.certificateStatusResult = result;
    });
    this.getAllData();
  
  }
  getAllData(){

    this.dataService.refreshData(this.route.snapshot.params['id']);
    this.certificateServiceServiceProxy.getProfile(this.route.snapshot.params['id'])
    .subscribe((result:CertificateDto)=>{
      this.profile=result;
    })
  }

}



