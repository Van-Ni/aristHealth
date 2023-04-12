import { AfterContentInit, Component, OnInit } from '@angular/core';
import { PagedRequestDto, IPagedResultDto } from '@shared/paged-listing-component-base';
import { MedicationKeyResultDtoPagedResultViewModel } from '../driver-health-check/driver-health-check.component';
import { CertificateDto, CertificateGroupStatusDtoPagedResultDto, CertificateGroupStatusServiceServiceProxy, CertificateServiceServiceProxy, GetDataServiceServiceProxy, KhoaMatServiceServiceProxy, MedicationKeyResultDtoPagedResultDto } from '@shared/service-proxies/service-proxies';
import { ActivatedRoute } from '@angular/router';
import { LoadingService } from '@app/services/loader/loading.service';
import { DataService } from '@app/services/data.service';

@Component({
  selector: 'app-Health-Certification',
  templateUrl: './Health-Certification.component.html',
  styleUrls: ['./Health-Certification.component.css']
})
export class HealthCertificationComponent implements AfterContentInit {
  isProfile1 = true;
  isTSBCDTKSK1 =true;
  isKhamTheLuc1 = true;
  isKhamLamSan1= true;
  isKhamCanLamSan1 = true;
  isKetLuan1 = true;
  request: PagedRequestDto;
  medicationKeyResult: IPagedResultDto<MedicationKeyResultDtoPagedResultViewModel>;
  certificateStatusResult:CertificateGroupStatusDtoPagedResultDto ;
  profile: CertificateDto;
  constructor(public loader: LoadingService, private dataService: DataService,private certificateServiceServiceProxy: CertificateServiceServiceProxy,private certificateGroupStatusServiceServiceProxy: CertificateGroupStatusServiceServiceProxy,private getDataServiceServiceProxy: GetDataServiceServiceProxy,private route: ActivatedRoute) { }

  ngAfterContentInit() {
    console.log(this.route.snapshot.params['id']);
    this.dataService.getAllKeyData().subscribe((result: MedicationKeyResultDtoPagedResultDto) => {
      console.log("Refresh data")
      this.medicationKeyResult = result;
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


