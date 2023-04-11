import { Component, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '@app/services/data.service';
import { IPagedResultDto, PagedRequestDto } from '@shared/paged-listing-component-base';
import {  CertificateDto, CertificateGroupStatusDtoPagedResultDto, CertificateGroupStatusServiceServiceProxy, CertificateServiceServiceProxy, GetDataServiceServiceProxy, KhoaMatServiceServiceProxy, MedicationKeyResultDtoPagedResultDto } from '@shared/service-proxies/service-proxies';
import { result } from 'lodash-es';
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
export class DriverHealthCheckComponent implements OnInit {
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
  constructor(private dataService: DataService,private certificateServiceServiceProxy: CertificateServiceServiceProxy,private certificateGroupStatusServiceServiceProxy: CertificateGroupStatusServiceServiceProxy,private getDataServiceServiceProxy: GetDataServiceServiceProxy,private route: ActivatedRoute) { }

  ngOnInit() {
    console.log(this.route.snapshot.params['id']);
    this.getDataServiceServiceProxy.getAll("", this.route.snapshot.params['id'], "",0,1000)
    .subscribe((result: MedicationKeyResultDtoPagedResultDto) => {
      this.medicationKeyResult = {
        items: result.items.map(x => {
          const medicationKeyResultDtoPagedResultViewModel = new MedicationKeyResultDtoPagedResultViewModel();
          medicationKeyResultDtoPagedResultViewModel.id = x.id;
          medicationKeyResultDtoPagedResultViewModel.certificateId = x.certificateId;
          medicationKeyResultDtoPagedResultViewModel.key = x.key;
          medicationKeyResultDtoPagedResultViewModel.value = x.value;
          medicationKeyResultDtoPagedResultViewModel.group = x.group;
          return medicationKeyResultDtoPagedResultViewModel;
        }),
        totalCount: result.totalCount
      };
      this.dataService.setData(this.route.snapshot.params['id']);
    });
    this.certificateGroupStatusServiceServiceProxy.getAll("",this.route.snapshot.params['id'], "",0,1000 )
    .subscribe((result: CertificateGroupStatusDtoPagedResultDto) =>{
     this.certificateStatusResult = result;
    });
    this.certificateServiceServiceProxy.getProfile(this.route.snapshot.params['id'])
    .subscribe((result:CertificateDto)=>{
      this.profile=result;
    })
  }

}


