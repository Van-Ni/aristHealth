import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientJsonpModule } from "@angular/common/http";
import { HttpClientModule } from "@angular/common/http";
import { ModalModule } from "ngx-bootstrap/modal";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { CollapseModule } from "ngx-bootstrap/collapse";
import { TabsModule } from "ngx-bootstrap/tabs";
import { NgxPaginationModule } from "ngx-pagination";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ServiceProxyModule } from "@shared/service-proxies/service-proxy.module";
import { SharedModule } from "@shared/shared.module";
import { HomeComponent } from "@app/home/home.component";
import { AboutComponent } from "@app/about/about.component";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
// tenants
import { TenantsComponent } from "@app/tenants/tenants.component";
import { CreateTenantDialogComponent } from "./tenants/create-tenant/create-tenant-dialog.component";
import { EditTenantDialogComponent } from "./tenants/edit-tenant/edit-tenant-dialog.component";
// roles
import { RolesComponent } from "@app/roles/roles.component";
import { CreateRoleDialogComponent } from "./roles/create-role/create-role-dialog.component";
import { EditRoleDialogComponent } from "./roles/edit-role/edit-role-dialog.component";
// users
import { UsersComponent } from "@app/users/users.component";
import { CreateUserDialogComponent } from "@app/users/create-user/create-user-dialog.component";
import { EditUserDialogComponent } from "@app/users/edit-user/edit-user-dialog.component";
import { ChangePasswordComponent } from "./users/change-password/change-password.component";
import { ResetPasswordDialogComponent } from "./users/reset-password/reset-password.component";
// layout
import { HeaderComponent } from "./layout/header.component";
import { HeaderLeftNavbarComponent } from "./layout/header-left-navbar.component";
import { HeaderLanguageMenuComponent } from "./layout/header-language-menu.component";
import { HeaderUserMenuComponent } from "./layout/header-user-menu.component";
import { FooterComponent } from "./layout/footer.component";
import { SidebarComponent } from "./layout/sidebar.component";
import { SidebarLogoComponent } from "./layout/sidebar-logo.component";
import { SidebarUserPanelComponent } from "./layout/sidebar-user-panel.component";
import { SidebarMenuComponent } from "./layout/sidebar-menu.component";
//manager
import { ProfileComponent } from "./formfile/profile/profile.component";
import { PhysicalExaminationComponent } from "./formfile/physical-examination/physical-examination.component";
import { DrivingMedicalHistoryComponent } from "./formfile/driver-health-check/driving-medical-history/driving-medical-history.component";
import { DriverHealthCheckComponent } from "./formfile/driver-health-check/driver-health-check.component";
import { CurrentConclusionType1Component } from "./formfile/driver-health-check/current-conclusion-type1/current-conclusion-type1.component";
import { ClinicalExamination1Component } from "./formfile/driver-health-check/clinical-examination1/clinical-examination1.component";
import { CertificateTypeComponent } from "./manager/certificate-type/certificate-type.component";
import { CreateCertificateTypeComponent } from "./manager/certificate-type/create-certificate-type/create-certificate-type.component";
import { EditCertificateTypeComponent } from "./manager/certificate-type/edit-certificate-type/edit-certificate-type.component";
import { CertificateGroupStatusComponent } from "./manager/certificate-group-status/certificate-group-status.component";
import { CreateCertificateGroupStatusComponent } from "./manager/certificate-group-status/create-certificate-group-status/create-certificate-group-status.component";
import { EditCertificateGroupStatusComponent } from "./manager/certificate-group-status/edit-certificate-group-status/edit-certificate-group-status.component";
import { CertificateComponent } from "./manager/certificate/certificate.component";

import { CreateCertificateComponent } from "./manager/certificate/create-certificate/create-certificate.component";
import { EditCertificateComponent } from "./manager/certificate/edit-certificate/edit-certificate.component";
import { Appove1Component } from "./formfile/driver-health-check/appove1/appove1.component";
import { KetLuanPhanLoaiComponent } from "./formfile/share/KetLuanPhanLoai/KetLuanPhanLoai.component";
import { Mat1Component } from "./formfile/driver-health-check/clinical-examination1/mat1/mat1.component";
import { TaiMuiHongComponent } from "./formfile/share/tai-mui-hong/tai-mui-hong.component";
import { TimMachComponent } from "./formfile/driver-health-check/clinical-examination1/tim-mach/tim-mach.component";
import { XetNghiemMaTuyVaMauComponent } from "./formfile/driver-health-check/subclinical-examination-type1/xet-nghiem-ma-tuy-va-mau/xet-nghiem-ma-tuy-va-mau.component";
import { XetNghiemKhac1Component } from "./formfile/driver-health-check/subclinical-examination-type1/xet-nghiem-khac1/xet-nghiem-khac1.component";
import { SubclinicalExaminationType1Component } from "./formfile/driver-health-check/subclinical-examination-type1/subclinical-examination-type1.component";
import { Du18Component } from "./formfile/du18/du18.component";
import { Chuadu18Component } from "./formfile/chuadu18/chuadu18.component";
import { KhoaWrapperComponent } from "./formfile/driver-health-check/khoa-wrapper/khoa-wrapper.component";
import { ClinicalExamination18maxComponent } from "./formfile/du18/clinical-examination18max/clinical-examination18max.component";
import { SubclinicalExaminationType18maxComponent } from "./formfile/du18/subclinical-examination-type18max/subclinical-examination-type18max.component";
import { Mat18Component } from "./formfile/share/mat18/mat18.component";
import { RangHamMatComponent } from "./formfile/share/rang-ham-mat/rang-ham-mat.component";
import { TaiMuiHongLaixeComponent } from "./formfile/driver-health-check/clinical-examination1/tai-mui-hong-laixe/tai-mui-hong-laixe.component";
import { ChanDoanHinhAnhComponent } from "./formfile/du18/subclinical-examination-type18max/chan-doan-hinh-anh/chan-doan-hinh-anh.component";
import { XetNghiemMauComponent } from "./formfile/du18/subclinical-examination-type18max/xet-nghiem-mau/xet-nghiem-mau.component";
import { XetNghiemNuocTieuComponent } from "./formfile/du18/subclinical-examination-type18max/xet-nghiem-nuoc-tieu/xet-nghiem-nuoc-tieu.component";
import { ThongTinCaNhanComponent } from "./formfile/share/thong-tin-ca-nhan/thong-tin-ca-nhan.component";
import { ClinicalExamination18minComponent } from "./formfile/chuadu18/clinical-examination18min/clinical-examination18min.component";
import { SubclinicalExaminationType18minComponent } from "./formfile/chuadu18/subclinical-examination-type18min/subclinical-examination-type18min.component";
import { XetNghiemKhacChua18Component } from "./formfile/chuadu18/subclinical-examination-type18min/xet-nghiem-khac-chua18/xet-nghiem-khac-chua18.component";
import { KetLuanGiayKhamComponent } from "./formfile/share/ket-luan-giay-kham/ket-luan-giay-kham.component";

import { ExportDataComponent } from "./manager/export-data/export-data.component";
import { CreateExportComponent } from "./manager/export-data/create-export/create-export.component";


import { CertificateSyncComponent } from "./manager/certificate-sync/certificate-sync.component";
import { CertificateSyncDetailComponent } from "./manager/certificate-sync/certificate-sync-detail/certificate-sync-detail.component";
import { CameraModalComponent } from "./manager/certificate/create-certificate/CameraCapture/CameraModal/CameraModal.component";

//service
import { DataService } from "./services/data.service";
import { LoadingService } from "./services/loader/loading.service";
import { RegionsService } from "./services/regions.service";
import { WebcamModule } from "ngx-webcam";
import { HospitalSettingComponent } from './HospitalSetting/HospitalSetting.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    HospitalSettingComponent,
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
    CertificateTypeComponent,
    CreateCertificateTypeComponent,
    EditCertificateTypeComponent,
    CertificateGroupStatusComponent,
    CreateCertificateGroupStatusComponent,
    EditCertificateGroupStatusComponent,
    CertificateComponent,
    CreateCertificateComponent,
    EditCertificateComponent,
    //fromfile
    ProfileComponent,
    PhysicalExaminationComponent,
    DriverHealthCheckComponent,
    DrivingMedicalHistoryComponent,
    CurrentConclusionType1Component,
    ClinicalExamination1Component,
    Mat1Component,
    Appove1Component,
    KetLuanPhanLoaiComponent,
    TaiMuiHongComponent,
    TimMachComponent,
    SubclinicalExaminationType1Component,
    XetNghiemMaTuyVaMauComponent,
    XetNghiemKhac1Component,
    Du18Component,
    Chuadu18Component,
    KhoaWrapperComponent,
    ClinicalExamination18maxComponent,
    SubclinicalExaminationType18maxComponent,
    Mat18Component,
    TaiMuiHongLaixeComponent,
    RangHamMatComponent,
    ChanDoanHinhAnhComponent,
    XetNghiemMauComponent,
    XetNghiemNuocTieuComponent,
    ThongTinCaNhanComponent,
    ClinicalExamination18minComponent,
    ExportDataComponent,
    CreateExportComponent,
    SubclinicalExaminationType18minComponent,
    XetNghiemKhacChua18Component,
    KetLuanGiayKhamComponent,
    //sync
    CertificateSyncComponent,
    CertificateSyncDetailComponent,
    CameraModalComponent,
      HospitalSettingComponent
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
    WebcamModule
  ],
  providers: [DataService, LoadingService, RegionsService],
})
export class AppModule {}
