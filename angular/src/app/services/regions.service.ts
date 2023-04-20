import { Injectable } from '@angular/core';
import { RegionDtlFull } from '@app/manager/certificate/certificate.component';
import { RegionDto, RegionServiceServiceProxy } from '@shared/service-proxies/service-proxies';

@Injectable({
  providedIn: 'root'
})
export class RegionsService {
  provinces: RegionDtlFull[];
  districts: RegionDtlFull[];
  communes: RegionDtlFull[];
constructor(private regionService: RegionServiceServiceProxy) { }
getProvince() {
  this.regionService.getAll("", "").subscribe(
    (result: RegionDto[]) => {
      this.provinces = result.map(r => {
        return {
          childrent: [],
          name: r.name,
          id: r.id,
          parentId: r.parentId
        };
      })
      console.log(this.provinces);
    }
  )
}
getDictrict(province: string) {
  this.regionService.getAll(province, "").subscribe(
    (result: RegionDto[]) => {
      this.districts = result.map(r => {
        return {
          childrent: [],
          name: r.name,
          id: r.id,
          parentId: r.parentId
        };
      })
      console.log(this.districts);
    }
  )
}
getCommune(province: string, district: string) {
  this.regionService.getAll(province, district).subscribe(
    (result: RegionDto[]) => {
      this.communes = result.map(r => {
        return {
          childrent: [],
          name: r.name,
          id: r.id,
          parentId: r.parentId
        };
      })
      console.log(this.communes);
    }
  )
}
}
