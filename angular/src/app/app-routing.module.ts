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
import { DeparmentComponent } from './manager/deparment/deparment.component';
import { ProfileComponent } from './formfile/profile/profile.component';
import { MedicalHistoryComponent } from './formfile/Health-Certification/medical-history/medical-history.component';
import { MedicalHistoryV2Component } from './formfile/health-certification-v2/medical-history-v2/medical-history-v2.component';
import { PhysicalExaminationComponent } from './formfile/physical-examination/physical-examination.component';
import { DrivingMedicalHistoryComponent } from './formfile/driver-health-check/driving-medical-history/driving-medical-history.component';
import { CurrentConclusionType3Component } from './formfile/Health-Certification/current-conclusion-type3/current-conclusion-type3.component';
import { CurrentConclusionType1Component } from './formfile/driver-health-check/current-conclusion-type1/current-conclusion-type1.component';
import { CurrentConclusionType2Component } from './formfile/health-certification-v2/current-conclusion-type2/current-conclusion-type2.component';
import { SubclinicalExaminationType3Component } from './formfile/Health-Certification/subclinical-examination-type3/subclinical-examination-type3.component';
import { SubclinicalExaminationType1Component } from './formfile/driver-health-check/subclinical-examination-type1/subclinical-examination-type1.component';
import { SubclinicalExaminationType2Component } from './formfile/health-certification-v2/subclinical-examination-type2/subclinical-examination-type2.component';
import { ClinicalExamination2Component } from './formfile/health-certification-v2/clinical-examination2/clinical-examination2.component';
import { ClinicalExamination3Component } from './formfile/Health-Certification/clinical-examination3/clinical-examination3.component';
import { ClinicalExamination1Component } from './formfile/driver-health-check/clinical-examination1/clinical-examination1.component';
import { DriverHealthCheckComponent } from './formfile/driver-health-check/driver-health-check.component';
import { CertificateTypeComponent } from './manager/certificate-type/certificate-type.component';
import { CertificateGroupStatusComponent } from './manager/certificate-group-status/certificate-group-status.component';
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
                    { path: 'deparments', component: DeparmentComponent, canActivate: [AppRouteGuard] },
                    { path: 'physical-examinations', component: PhysicalExaminationComponent, canActivate: [AppRouteGuard] },
                    { path: 'certificate-types', component: CertificateTypeComponent, canActivate: [AppRouteGuard] },
                    { path: 'certificate-group-status', component: CertificateGroupStatusComponent, canActivate: [AppRouteGuard] },
                    { path: 'profiles', component: ProfileComponent, canActivate: [AppRouteGuard] },
                    { path: 'driver-health-check', component: DriverHealthCheckComponent, canActivate: [AppRouteGuard] },
                    { path: 'CurrentConclusionType3', component: CurrentConclusionType3Component, canActivate: [AppRouteGuard] },
                    { path: 'CurrentConclusionType2', component: CurrentConclusionType2Component, canActivate: [AppRouteGuard] },
                    { path: 'CurrentConclusionType1', component: CurrentConclusionType1Component, canActivate: [AppRouteGuard] },
                    { path: 'ClinicalExamination3', component: ClinicalExamination3Component, canActivate: [AppRouteGuard] },
                    { path: 'ClinicalExamination2', component: ClinicalExamination2Component, canActivate: [AppRouteGuard] },
                    { path: 'ClinicalExamination1', component: ClinicalExamination1Component, canActivate: [AppRouteGuard] },
                    { path: 'SubclinicalExaminationType3', component: SubclinicalExaminationType3Component, canActivate: [AppRouteGuard] },
                    { path: 'SubclinicalExaminationType2', component: SubclinicalExaminationType2Component, canActivate: [AppRouteGuard] },
                    { path: 'SubclinicalExaminationType1', component: SubclinicalExaminationType1Component, canActivate: [AppRouteGuard] },
                    { path: 'DrivingMedicalHistory', component: DrivingMedicalHistoryComponent, canActivate: [AppRouteGuard] },
                    { path: 'medicalhistorys', component: MedicalHistoryComponent, canActivate: [AppRouteGuard] },
                    { path: 'medicalhistorysv2', component: MedicalHistoryV2Component, canActivate: [AppRouteGuard] },
                    { path: 'update-password', component: ChangePasswordComponent, canActivate: [AppRouteGuard] }
                ]
            }
        ])
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
