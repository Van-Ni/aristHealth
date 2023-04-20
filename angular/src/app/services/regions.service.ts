import { Injectable } from '@angular/core';
import { RegionDtlFull } from '@app/manager/certificate/certificate.component';
import { RegionDto, RegionServiceServiceProxy } from '@shared/service-proxies/service-proxies';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegionsService {
  provinces: RegionDtlFull[];
  districts: RegionDtlFull[];
  communes: RegionDtlFull[];
  constructor(private regionService: RegionServiceServiceProxy) { }
  getProvince(): Observable<RegionDto[]> {
    return this.regionService.getAll("", "");
  }
  getDictrict(province: string): Observable<RegionDto[]> {
    return this.regionService.getAll(province, "");
  }
  getCommune(province: string, district: string): Observable<RegionDto[]> {
    return this.regionService.getAll(province, district);
  }
}
