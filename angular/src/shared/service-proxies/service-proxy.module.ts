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
        ApiServiceProxies.CertificateTypeServiceServiceProxy,
        ApiServiceProxies.CertificateServiceServiceProxy,
        ApiServiceProxies.GetDataServiceServiceProxy,
        ApiServiceProxies.CertificateGroupStatusServiceServiceProxy,
        ApiServiceProxies.GroupStatusServiceServiceProxy,
        ApiServiceProxies.PDFServiceServiceProxy,
        ApiServiceProxies.KetLuanServicesServiceProxy,
        ApiServiceProxies.ApproveServiceServiceProxy,
        ApiServiceProxies.RegionServiceServiceProxy,
        { provide: HTTP_INTERCEPTORS, useClass: AbpHttpInterceptor, multi: true }
    ]
})
export class ServiceProxyModule { }
   