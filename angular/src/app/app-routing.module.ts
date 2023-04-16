import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { UsersComponent } from './users/users.component';
import { TenantsComponent } from './tenants/tenants.component';
import { RolesComponent } from 'app/roles/roles.component';
import { ChangePasswordComponent } from './users/change-password/change-password.component';
import { ProfileComponent } from './formfile/profile/profile.component';
import { PhysicalExaminationComponent } from './formfile/physical-examination/physical-examination.component';
import { DriverHealthCheckComponent } from './formfile/driver-health-check/driver-health-check.component';
import { CertificateTypeComponent } from './manager/certificate-type/certificate-type.component';
import { CertificateGroupStatusComponent } from './manager/certificate-group-status/certificate-group-status.component';
import { CertificateComponent } from './manager/certificate/certificate.component';
import { HealthCertificationComponent } from './formfile/Health-Certification/Health-Certification.component';
@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: AppComponent,
                children: [
                    { path: 'home', component: HomeComponent,  canActivate: [AppRouteGuard] },
                    { path: 'users', component: UsersComponent, data: { permission: 'Pages.Users' }, canActivate: [AppRouteGuard] },
                    { path: 'roles', component: RolesComponent, data: { permission: 'Pages.Roles' }, canActivate: [AppRouteGuard] },
                    { path: 'tenants', component: TenantsComponent, data: { permission: 'Pages.Tenants' }, canActivate: [AppRouteGuard] },
                    { path: 'about', component: AboutComponent, canActivate: [AppRouteGuard] },
                    { path: 'certificates', component: CertificateComponent, canActivate: [AppRouteGuard] },
                    { path: 'physical-examinations', component: PhysicalExaminationComponent, canActivate: [AppRouteGuard] },
                    { path: 'certificate-types', component: CertificateTypeComponent, canActivate: [AppRouteGuard] },
                    { path: '1/:id', component: DriverHealthCheckComponent, canActivate: [AppRouteGuard] },
                    { path: 'certificate-group-status', component: CertificateGroupStatusComponent, canActivate: [AppRouteGuard] },
                    { path: 'profiles', component: ProfileComponent, canActivate: [AppRouteGuard] },
                    { path: 'driver-health-check', component: DriverHealthCheckComponent, canActivate: [AppRouteGuard] },
                    { path: 'health-certification', component: HealthCertificationComponent, canActivate: [AppRouteGuard] },
                    { path: 'update-password', component: ChangePasswordComponent, canActivate: [AppRouteGuard] }
                ]
            }
        ])
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
