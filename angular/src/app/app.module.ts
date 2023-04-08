import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientJsonpModule } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceProxyModule } from '@shared/service-proxies/service-proxy.module';
import { SharedModule } from '@shared/shared.module';
import { HomeComponent } from '@app/home/home.component';
import { AboutComponent } from '@app/about/about.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

// tenants
import { TenantsComponent } from '@app/tenants/tenants.component';
import { CreateTenantDialogComponent } from './tenants/create-tenant/create-tenant-dialog.component';
import { EditTenantDialogComponent } from './tenants/edit-tenant/edit-tenant-dialog.component';
// roles
import { RolesComponent } from '@app/roles/roles.component';
import { CreateRoleDialogComponent } from './roles/create-role/create-role-dialog.component';
import { EditRoleDialogComponent } from './roles/edit-role/edit-role-dialog.component';
// users
import { UsersComponent } from '@app/users/users.component';
import { CreateUserDialogComponent } from '@app/users/create-user/create-user-dialog.component';
import { EditUserDialogComponent } from '@app/users/edit-user/edit-user-dialog.component';
import { ChangePasswordComponent } from './users/change-password/change-password.component';
import { ResetPasswordDialogComponent } from './users/reset-password/reset-password.component';
// layout
import { HeaderComponent } from './layout/header.component';
import { HeaderLeftNavbarComponent } from './layout/header-left-navbar.component';
import { HeaderLanguageMenuComponent } from './layout/header-language-menu.component';
import { HeaderUserMenuComponent } from './layout/header-user-menu.component';
import { FooterComponent } from './layout/footer.component';
import { SidebarComponent } from './layout/sidebar.component';
import { SidebarLogoComponent } from './layout/sidebar-logo.component';
import { SidebarUserPanelComponent } from './layout/sidebar-user-panel.component';
import { SidebarMenuComponent } from './layout/sidebar-menu.component';
//manager
import {DeparmentComponent} from './manager/deparment/deparment.component';
import {CreateDepartmentComponent} from './manager/deparment/create-department/create-department.component';
import {EditDepartmentComponent} from'./manager/deparment/edit-department/edit-department.component';
import {ProfileComponent} from './formfile/profile/profile.component';
import {HealthCertificationComponent} from './formfile/Health-Certification/Health-Certification.component';
import {MedicalHistoryComponent} from './formfile/Health-Certification/medical-history/medical-history.component';
import {HealthCertificationV2Component} from './formfile/health-certification-v2/health-certification-v2.component';
import {MedicalHistoryV2Component} from './formfile/health-certification-v2/medical-history-v2/medical-history-v2.component';
import {PhysicalExaminationComponent} from './formfile/physical-examination/physical-examination.component';
import {DrivingMedicalHistoryComponent} from './formfile/driver-health-check/driving-medical-history/driving-medical-history.component';
import {DriverHealthCheckComponent} from './formfile/driver-health-check/driver-health-check.component';
import {CurrentConclusionType2Component} from './formfile/health-certification-v2/current-conclusion-type2/current-conclusion-type2.component';
import {CurrentConclusionType1Component} from './formfile/driver-health-check/current-conclusion-type1/current-conclusion-type1.component';
import {CurrentConclusionType3Component} from './formfile/Health-Certification/current-conclusion-type3/current-conclusion-type3.component';
import {SubclinicalExaminationType1Component} from './formfile/driver-health-check/subclinical-examination-type1/subclinical-examination-type1.component';
import {SubclinicalExaminationType2Component} from './formfile/health-certification-v2/subclinical-examination-type2/subclinical-examination-type2.component';
import {SubclinicalExaminationType3Component} from './formfile/Health-Certification/subclinical-examination-type3/subclinical-examination-type3.component';
import {ClinicalExamination3Component} from './formfile/Health-Certification/clinical-examination3/clinical-examination3.component';
import {ClinicalExamination2Component} from './formfile/health-certification-v2/clinical-examination2/clinical-examination2.component';
import {ClinicalExamination1Component} from './formfile/driver-health-check/clinical-examination1/clinical-examination1.component';
import {TamThan1Component} from './formfile/driver-health-check/clinical-examination1/tam-than1/tam-than1.component';
import {ThanKinh1Component} from './formfile/driver-health-check/clinical-examination1/than-kinh1/than-kinh1.component';
import { TimMach1Component } from './formfile/driver-health-check/clinical-examination1/tim-mach1/tim-mach1.component';
import {ThaiSan1Component} from './formfile/driver-health-check/clinical-examination1/thai-san1/thai-san1.component';
import {TaiMuiHong1Component} from './formfile/driver-health-check/clinical-examination1/tai-mui-hong1/tai-mui-hong1.component';
import {NoiTiet1Component} from './formfile/driver-health-check/clinical-examination1/noi-tiet1/noi-tiet1.component';
import {Mat1Component} from './formfile/driver-health-check/clinical-examination1/mat1/mat1.component';
import {HoHap1Component} from './formfile/driver-health-check/clinical-examination1/ho-hap1/ho-hap1.component';
import {CoXuongKhop1Component} from './formfile/driver-health-check/clinical-examination1/co-xuong-khop1/co-xuong-khop1.component';
import {CertificateTypeComponent} from './manager/certificate-type/certificate-type.component';
import {CreateCertificateTypeComponent} from './manager/certificate-type/create-certificate-type/create-certificate-type.component';
import {EditCertificateTypeComponent} from './manager/certificate-type/edit-certificate-type/edit-certificate-type.component'
import {CertificateGroupStatusComponent} from './manager/certificate-group-status/certificate-group-status.component';
import {CreateCertificateGroupStatusComponent} from './manager/certificate-group-status/create-certificate-group-status/create-certificate-group-status.component';
import {EditCertificateGroupStatusComponent} from './manager/certificate-group-status/edit-certificate-group-status/edit-certificate-group-status.component';
//service
import {DataService} from './services/data.service';
@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        AboutComponent,
        // tenants
        TenantsComponent,
        CreateTenantDialogComponent,
        EditTenantDialogComponent,
        // roles
        RolesComponent,
        CreateRoleDialogComponent,
        EditRoleDialogComponent,
        // users
        UsersComponent,
        CreateUserDialogComponent,
        EditUserDialogComponent,
        ChangePasswordComponent,
        ResetPasswordDialogComponent,
        // layout
        HeaderComponent,
        HeaderLeftNavbarComponent,
        HeaderLanguageMenuComponent,
        HeaderUserMenuComponent,
        FooterComponent,
        SidebarComponent,
        SidebarLogoComponent,
        SidebarUserPanelComponent,
        SidebarMenuComponent,
        //manager
        DeparmentComponent,
        CreateDepartmentComponent,
        EditDepartmentComponent,
        CertificateTypeComponent,
        CreateCertificateTypeComponent,
        EditCertificateTypeComponent,
        CertificateGroupStatusComponent,
        CreateCertificateGroupStatusComponent,
        EditCertificateGroupStatusComponent,
        //fromfile
        ProfileComponent,
        HealthCertificationComponent,
        MedicalHistoryComponent,
        HealthCertificationV2Component,
        MedicalHistoryV2Component,
        PhysicalExaminationComponent,
        DriverHealthCheckComponent,
        DrivingMedicalHistoryComponent,
        CurrentConclusionType2Component,
        CurrentConclusionType1Component,
        CurrentConclusionType3Component,
        SubclinicalExaminationType3Component,
        SubclinicalExaminationType2Component,
        SubclinicalExaminationType1Component,
        ClinicalExamination1Component,
        ClinicalExamination2Component,
        ClinicalExamination3Component,
        TamThan1Component,
        ThanKinh1Component,
        CoXuongKhop1Component,
        HoHap1Component,
        Mat1Component,
        NoiTiet1Component,
        TaiMuiHong1Component,
        ThaiSan1Component,
        TimMach1Component
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        HttpClientJsonpModule,
        ModalModule.forChild(),
        BsDropdownModule,
        BsDatepickerModule.forRoot(),
        CollapseModule,
        TabsModule,
        AppRoutingModule,
        ServiceProxyModule,
        SharedModule,
        NgxPaginationModule,
    ],
    providers: [DataService]
})
export class AppModule {}
