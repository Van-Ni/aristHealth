import { Injectable } from '@angular/core';
import { CertificateGroupStatusDtoPagedResultDto, CertificateGroupStatusServiceServiceProxy, CertificateServiceServiceProxy, GetDataServiceServiceProxy } from '@shared/service-proxies/service-proxies';
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
  allKeyData =  new BehaviorSubject<CertificateGroupStatusDtoPagedResultDto>(null);
  groupStatus = new BehaviorSubject<CertificateGroupStatusDtoPagedResultDto>(null);
  setData(data: any) {
    this.data = data;
  }

  getData(): any {
    return this.data;
  }
  getAllKeyData ():Observable<CertificateGroupStatusDtoPagedResultDto>{
    return this.allKeyData.asObservable();
  }
  getGroupData ():Observable<CertificateGroupStatusDtoPagedResultDto>{
    return this.groupStatus.asObservable();
  }
  
  refreshData(cerId: string){
    console.log("refreshData");
    this.getDataServiceServiceProxy.getAll(cerId)
      .subscribe((result: CertificateGroupStatusDtoPagedResultDto) => {
        this.allKeyData.next(result);
    })
    this.certificateGroupStatusServiceServiceProxy.getAll(cerId)
    .subscribe((result: CertificateGroupStatusDtoPagedResultDto) =>{
     this.groupStatus.next(result);
    });
  };
}
