import { Injectable } from '@angular/core';
import { CertificateGroupStatusDtoPagedResultDto, CertificateGroupStatusServiceServiceProxy, CertificateServiceServiceProxy, GetDataServiceServiceProxy, MedicationKeyResultDtoPagedResultDto } from '@shared/service-proxies/service-proxies';
import { BehaviorSubject, Observable, Observer, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  /**
   *
   */
  constructor(
    private certificateServiceServiceProxy: CertificateServiceServiceProxy,
    private certificateGroupStatusServiceServiceProxy: CertificateGroupStatusServiceServiceProxy,
    private getDataServiceServiceProxy: GetDataServiceServiceProxy) {
    
  }
  data: any;
  allKeyData =  new BehaviorSubject<MedicationKeyResultDtoPagedResultDto>(null);
  setData(data: any) {
    this.data = data;
  }

  getData(): any {
    return this.data;
  }
  getAllKeyData ():Observable<MedicationKeyResultDtoPagedResultDto>{
    return this.allKeyData.asObservable();
  }
  groupStatus = new BehaviorSubject<CertificateGroupStatusDtoPagedResultDto>(null);
  getGroupData ():Observable<CertificateGroupStatusDtoPagedResultDto>{
    return this.groupStatus.asObservable();
  }
  
  refreshData(cerId: string){
    console.log("refreshData");
    this.getDataServiceServiceProxy.getAll(cerId)
      .subscribe((result: MedicationKeyResultDtoPagedResultDto) => {
        this.allKeyData.next(result);
    })
    this.certificateGroupStatusServiceServiceProxy.getAll(cerId)
    .subscribe((result: CertificateGroupStatusDtoPagedResultDto) =>{
     this.groupStatus.next(result);
    });
  };
}
