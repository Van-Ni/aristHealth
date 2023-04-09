import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AbpHttpInterceptor } from 'abp-ng2-module';

import * as ApiServiceProxies from './service-proxies';

@NgModule({
    providers: [
        ApiServiceProxies.RoleServiceProxy,
        ApiServiceProxies.SessionServiceProxy,
        ApiServiceProxies.TenantServiceProxy,
        ApiServiceProxies.UserServiceProxy,
        ApiServiceProxies.TokenAuthServiceProxy,
        ApiServiceProxies.AccountServiceProxy,
        ApiServiceProxies.ConfigurationServiceProxy,
        ApiServiceProxies.DepartmentServiceServiceProxy,
        ApiServiceProxies.CertificateGroupStatusServiceServiceProxy,
        ApiServiceProxies.ClientInfoServiceServiceProxy,
        ApiServiceProxies.KhoaMatServiceServiceProxy,
        ApiServiceProxies.KhoaHoHapServiceServiceProxy,
        ApiServiceProxies.KhoaCoXuongKhopServiceServiceProxy,
        ApiServiceProxies.KhoaNhiKhoaServiceServiceProxy,
        ApiServiceProxies.KhoaNoiTietServiceServiceProxy,
        ApiServiceProxies.KhoaRangHamMatServiceServiceProxy,
        ApiServiceProxies.KhoaTaiMuiHongServiceServiceProxy,
        ApiServiceProxies.KhoaTamThanServiceServiceProxy,
        ApiServiceProxies.KhoaThaiSanServiceServiceProxy,
        ApiServiceProxies.KhoaThanKinhServiceServiceProxy,
        ApiServiceProxies.KhoaTimMachServiceServiceProxy,
        ApiServiceProxies.XetNghiemKhacServiceServiceProxy,
        ApiServiceProxies.XetNghiemMaTuyVaMauServiceServiceProxy,
        ApiServiceProxies.XetNghiemMauServiceServiceProxy,
        ApiServiceProxies.XetNghiemNuocTieuServiceServiceProxy,
        ApiServiceProxies.ChanDoanHinhAnhServiceServiceProxy,
        ApiServiceProxies.KetLuanServiceServiceProxy,
        ApiServiceProxies.KhamTheLucServiceServiceProxy,
        ApiServiceProxies.CertificateTypeServiceServiceProxy,
        ApiServiceProxies.CertificateServiceServiceProxy,
        { provide: HTTP_INTERCEPTORS, useClass: AbpHttpInterceptor, multi: true }
    ]
})
export class ServiceProxyModule { }
   