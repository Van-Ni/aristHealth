import { NgModule } from "@angular/core";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AbpHttpInterceptor } from "abp-ng2-module";

import * as ApiServiceProxies from "./service-proxies";
import { SpinerInterceptor } from "@shared/interceptors/SpinerInterceptor";

@NgModule({
  providers: [
    ApiServiceProxies.RoleServiceProxy,
    ApiServiceProxies.SessionServiceProxy,
    ApiServiceProxies.TenantServiceProxy,
    ApiServiceProxies.UserServiceProxy,
    ApiServiceProxies.TokenAuthServiceProxy,
    ApiServiceProxies.AccountServiceProxy,
    ApiServiceProxies.ConfigurationServiceProxy,
    ApiServiceProxies.CertificateGroupStatusServiceServiceProxy,
    ApiServiceProxies.CertificateTypeServiceServiceProxy,
    ApiServiceProxies.CertificateServiceServiceProxy,
    ApiServiceProxies.CertificateGroupStatusServiceServiceProxy,
    ApiServiceProxies.GroupStatusServiceServiceProxy,
    ApiServiceProxies.PDFServiceServiceProxy,
    ApiServiceProxies.KetLuanServicesServiceProxy,
    ApiServiceProxies.ApproveServiceServiceProxy,
    ApiServiceProxies.RegionServiceServiceProxy,
    ApiServiceProxies.HistoryExportServiceServiceProxy,
    ApiServiceProxies.SyncServiceServiceProxy,
    ApiServiceProxies.HospitalSettingServiceServiceProxy,
    { provide: HTTP_INTERCEPTORS, useClass: AbpHttpInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: SpinerInterceptor, multi: true },
  ],
})
export class ServiceProxyModule {}
