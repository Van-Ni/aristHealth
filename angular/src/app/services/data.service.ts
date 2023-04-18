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
    private certificateGroupStatusServiceServiceProxy: CertificateGroupStatusServiceServiceProxy) {
    
  }
  allKeyData =  new BehaviorSubject<CertificateGroupStatusDtoPagedResultDto>(null);
  
  
  getAllKeyData ():Observable<CertificateGroupStatusDtoPagedResultDto>{
    return this.allKeyData.asObservable();
  }
  
  refreshData(cerId: string){
    console.log("refreshData");
    this.certificateGroupStatusServiceServiceProxy.getAll(cerId)
    .subscribe((result: CertificateGroupStatusDtoPagedResultDto) =>{
     this.allKeyData.next(result);
    });
  };
}
