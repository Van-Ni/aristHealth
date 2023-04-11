import { Component, OnInit } from '@angular/core';
import { PagedRequestDto, IPagedResultDto } from '@shared/paged-listing-component-base';
import { MedicationKeyResultDtoPagedResultViewModel } from '../driver-health-check/driver-health-check.component';
import { KhoaMatServiceServiceProxy, MedicationKeyResultDtoPagedResultDto } from '@shared/service-proxies/service-proxies';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-Health-Certification',
  templateUrl: './Health-Certification.component.html',
  styleUrls: ['./Health-Certification.component.css']
})
export class HealthCertificationComponent implements OnInit {
  isProfile1 = true;
  isTSBCDTKSK1 =true;
  isKhamTheLuc1 = true;
  isKhamLamSan1= true;
  isKhamCanLamSan1 = true;
  isKetLuan1 = true;
  request: PagedRequestDto;
  medicationKeyResult: IPagedResultDto<MedicationKeyResultDtoPagedResultViewModel>;
  constructor(private khoaMatServiceServiceProxy: KhoaMatServiceServiceProxy,private route: ActivatedRoute) { }

  ngOnInit() {
    console.log(this.route.snapshot.params['id']);
   
    //this.dataService.setData(this.medicationKeyResult);
  }


}
