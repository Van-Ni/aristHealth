import { Component, Input, OnInit, Output } from '@angular/core';
import { DataService } from '@app/services/data.service';
import { IPagedResultDto, PagedRequestDto } from '@shared/paged-listing-component-base';
import { MedicationKeyResultB2ServiceServiceProxy, MedicationKeyResultDtoPagedResultDto } from '@shared/service-proxies/service-proxies';
export class MedicationKeyResultDtoPagedResultViewModel{
 id: string;
 certificateId: string;
 key: string;
 value: string;
 userId: number;
}
@Component({
  selector: 'app-driver-health-check',
  templateUrl: './driver-health-check.component.html',
  styleUrls: ['./driver-health-check.component.css']
})
export class DriverHealthCheckComponent implements OnInit {
  isProfile1 = true;
  isTSBCDTKSK1 =true;
  isKhamLamSan1= true;
  isKhamCanLamSan1 = true;
  isKetLuan1 = true;
  request: PagedRequestDto;
  medicationKeyResult: IPagedResultDto<MedicationKeyResultDtoPagedResultViewModel>;
  
  constructor(private dataService: DataService,private medicationKeyResultB2ServiceServiceProxy: MedicationKeyResultB2ServiceServiceProxy) { }

  ngOnInit() {
    this.medicationKeyResultB2ServiceServiceProxy.getAll("", "f4e1980b-40d9-49d5-9c59-7a364ced6253",0,1000)
    .subscribe((result: MedicationKeyResultDtoPagedResultDto) => {
      this.medicationKeyResult = {
        items: result.items.map(x => {
          const medicationKeyResultDtoPagedResultViewModel = new MedicationKeyResultDtoPagedResultViewModel();
          medicationKeyResultDtoPagedResultViewModel.id = x.id;
          medicationKeyResultDtoPagedResultViewModel.certificateId = x.certificateId;
          medicationKeyResultDtoPagedResultViewModel.key = x.key;
          medicationKeyResultDtoPagedResultViewModel.value = x.value;
          medicationKeyResultDtoPagedResultViewModel.userId = x.userId;
          return medicationKeyResultDtoPagedResultViewModel;
        }),
        totalCount: result.totalCount
      };
      this.dataService.setData(this.medicationKeyResult);
    });
  }

}


