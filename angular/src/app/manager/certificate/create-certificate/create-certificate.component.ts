import { PaymentStatus } from "./../../../../shared/service-proxies/service-proxies";
import { RegionDtlFull } from "./../certificate.component";
import {
  Component,
  EventEmitter,
  Injector,
  OnInit,
  Output,
} from "@angular/core";
import { AppComponentBase } from "@shared/app-component-base";
import {
  CertificateServiceServiceProxy,
  CertificateTypeDto,
  CertificateTypeServiceServiceProxy,
  ClientInfoDto,
  CreateCertificateDto,
  RegionDto,
  RegionFull,
} from "@shared/service-proxies/service-proxies";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { RegionsService } from "@app/services/regions.service";
import { DateTimeHelper } from "@shared/helpers/DateTimeHelper";
import { CameraModalComponent } from "./CameraCapture/CameraModal/CameraModal.component";

@Component({
  selector: "app-create-certificate",
  templateUrl: "./create-certificate.component.html",
  styleUrls: ["./create-certificate.component.css"],
})
export class CreateCertificateComponent
  extends AppComponentBase
  implements OnInit
{
  certificate: CreateCertificateDto;
  certificateTypeDto: CertificateTypeDto;
  saving = false;
  scanning = true;
  provinces: RegionDtlFull[];
  districts: RegionDtlFull[];
  communes: RegionDtlFull[];
  container: any;



  @Output() onSave = new EventEmitter<any>();
  constructor(
    private certificateServiceServiceProxy: CertificateServiceServiceProxy,
    public bsModalRef: BsModalRef,
    private certificateType: CertificateTypeServiceServiceProxy,
    private regionsService: RegionsService,
    private injector: Injector,
    private _modalService: BsModalService,
  ) {
    super(injector);
  }
  ngOnInit() {
    this.certificate = new CreateCertificateDto();
    this.certificate.clientInfo = new ClientInfoDto();
    this.certificate.clientInfo.provinceId = "64";
    this.certificate.clientInfo.addressCCCD =
      "Cục Cảnh sát quản lý hành chính về trật tự xã hội";
    this.certificate.paymentStatus = PaymentStatus._1;
    this.getProvince();
    this.getDictrict();
    this.getCommune();
    //this.setgiatien();
  }

  scanStarted = false;
  barcodeData = "";
  onKeyDown(event: KeyboardEvent) {
    if (event.keyCode === 9) {
      if (
        this.certificate.clientInfo.fullName &&
        this.certificate.clientInfo.fullName.length > 30
      ) {
        event.preventDefault();
        this.extractAndBindingData(this.certificate.clientInfo.fullName);
      }
    }
  }
  extractAndBindingData(pastedText: string) {
    let cccdData = pastedText.split("|");
    console.log(cccdData);
    if (cccdData.length >= 7) {
      this.certificate.clientInfo.cccd = cccdData[0];
      this.certificate.clientInfo.fullName = cccdData[2];
      this.certificate.clientInfo.dateOfBirth = DateTimeHelper.extractDatetime(
        cccdData[3]
      );
      this.certificate.clientInfo.sex =
        cccdData[4].toLowerCase() == "nam" ? "nam" : "nu";
      this.certificate.clientInfo.createTimeCCCD =
        DateTimeHelper.extractDatetime(cccdData[6]);
      this.regionsService.getAddress(cccdData[5]).subscribe((data) => {
        this.setAddress(data);
        this.scanning = false;
      }, (e)=> abp.message.error("Không tìm thấy địa chỉ trong dữ liệu"));
    } else if (cccdData.length < 7) {
      this.certificate.clientInfo.cccd = cccdData[0];
      this.certificate.clientInfo.fullName = cccdData[1];
      this.certificate.clientInfo.dateOfBirth = DateTimeHelper.extractDatetime(
        cccdData[2]
      );
      this.certificate.clientInfo.sex =
        cccdData[3].toLowerCase() == "nam" ? "nam" : "nu";

      this.certificate.clientInfo.createTimeCCCD =
        DateTimeHelper.extractDatetime(cccdData[5]);
      this.regionsService.getAddress(cccdData[4]).subscribe((data) => {
        this.setAddress(data);
        this.scanning = false;
      }, (e)=> abp.message.error("Không tìm thấy địa chỉ trong dữ liệu"));
    }
  }
  getApi(data: any) {
    console.log(data.target.value);
    this.certificateType
      .get(data.target.value)
      .subscribe((result: CertificateTypeDto) => {
        console.log(result);
        this.certificate.amountPaid = result.price;
        this.container = result.price;
      });
  }
  setPrice(event: any) {
    if (event.target.value == 0) {
      this.certificate.amountPaid = 0;
    }
    if (event.target.value == 1) {
      this.certificate.amountPaid = this.certificateTypeDto.price;
    }
  }
  getProvince() {
    this.regionsService.getProvince().subscribe((result: RegionDto[]) => {
      this.provinces = result.map((r) => {
        return {
          childrent: [],
          name: r.name,
          id: r.id,
          parentId: r.parentId,
        };
      });
    });
  }
  getDictrict() {
    if (this.certificate.clientInfo.provinceId)
      this.regionsService
        .getDictrict(this.certificate.clientInfo.provinceId)
        .subscribe((result: RegionDto[]) => {
          this.districts = result.map((r) => {
            return {
              childrent: [],
              name: r.name,
              id: r.id,
              parentId: r.parentId,
            };
          });
          if (
            this.certificate.clientInfo
          ) {
            this.certificate.clientInfo.districtId = this.districts[0].id;
            this.getCommune();
          }
        });
  }
  getCommune() {
    if (
      this.certificate.clientInfo.provinceId &&
      this.certificate.clientInfo.districtId
    )
      this.regionsService
        .getCommune(
          this.certificate.clientInfo.provinceId,
          this.certificate.clientInfo.districtId
        )
        .subscribe((result: RegionDto[]) => {
          this.communes = result.map((r) => {
            return {
              childrent: [],
              name: r.name,
              id: r.id,
              parentId: r.parentId,
            };
          });
          if (
            this.certificate.clientInfo
          ) {
            console.log("this.communes: ", this.communes);
            this.certificate.clientInfo.communeId = this.communes[0].id;
          }
        });
  }
  calculateAge(dateOfBirth) {
    let birthDate = dateOfBirth;
    if(typeof dateOfBirth == 'string'){
      const [day, month, year] = dateOfBirth.split('/');
      birthDate = new Date(`${year}-${month}-${day}`);
    }


    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  }
  setAddress(region: RegionFull) {
    this.provinces = [
      {
        id: region.province.id,
        name: region.province.name,
        childrent: null,
      },
    ];
    this.certificate.clientInfo.province = region.province.name;
    this.certificate.clientInfo.provinceId = region.province.id;
    this.districts = [
      {
        id: region.dictrict.id,
        name: region.dictrict.name,
        childrent: null,
      },
    ];
    this.certificate.clientInfo.district = region.dictrict.name;
    this.certificate.clientInfo.districtId = region.dictrict.id;
    this.communes = [
      {
        id: region.commute.id,
        name: region.commute.name,
        childrent: null,
      },
    ];
    this.certificate.clientInfo.commune = region.commute.name;
    this.certificate.clientInfo.communeId = region.commute.id;
  }
  showMessage(message: string) {
    abp.message.info(message, this.l("InvalidData"));
  }
  isNumericString(str) {
    return /^\d+$/.test(str);
  }

  isValidString(str) {
    const regex = /^[A-Z]\d{7}$/; // 1 uppercase letter followed by 7 digits
    return regex.test(str);
  }
  isValidIdNumber(idNumber) {
    if (this.isValidString(idNumber)) return true;
    return (
      this.isNumericString(idNumber) &&
      (idNumber.length === 9 || idNumber.length === 12)
    );
  }
  checkDriverLisenceValid() {
    let age = this.calculateAge(this.certificate.clientInfo.dateOfBirth);
    if (age > 27) return "";
    switch (this.certificate.reason) {
      case "A1":
      case "A3":
      case "A2":
      case "A4":
      case "B1":
      case "B2":
        if (age >= 18) return "";
        else return "Chưa đủ 18 tuổi";
      case "C":
      case "FB2":
        if (age >= 21) return "";
        else return "Chưa đủ 21 tuổi";
      case "D":
      case "FC":
        if (age >= 24) return "";
        else return "Chưa đủ 24 tuổi";
      default:
        return "";
    }
  }
  isValidDate(dateString) {
    let date;
    if(typeof dateString == 'string'){
      const [day, month, year] = dateString.split('/');
      date = new Date(`${year}-${month}-${day}`);
    }else{
      date = new Date(dateString)
    }
    return !isNaN(date.getTime());
  }
  validate(): boolean {
    if (!this.certificate.certificateTypeId) {
      this.showMessage("Vui lòng chọn giấy khám");
      return false;
    }
    if (!this.certificate.reason) {
      this.showMessage("Vui lòng nhập hạng bằng lái hoặc lí do khám bệnh");
      return false;
    }
    if (
      !this.certificate.clientInfo.dateOfBirth ||
      !this.isValidDate(this.certificate.clientInfo.dateOfBirth)
    ) {
      this.showMessage("Vui lòng nhập ngày tháng năm sinh");
      return false;
    }
    if (!this.certificate.clientInfo.fullName) {
      this.showMessage("Vui lòng nhập họ tên");
      return false;
    }
    if (!this.certificate.clientInfo.sex) {
      this.showMessage("Vui lòng chọn giới tính");
      return false;
    }
    switch (+this.certificate.certificateTypeId) {
      case 1: {
        //Driver
        let msg = this.checkDriverLisenceValid();
        if (msg) {
          this.showMessage(msg);
          return false;
        }
      }
      case 2: {
        //Adult
        if (!this.isValidIdNumber(this.certificate.clientInfo.cccd)) {
          this.showMessage("Số CCCD/CMND/HC không chính xác");
          return false;
        }
        if (!this.certificate.clientInfo.addressCCCD) {
          this.showMessage("Vui lòng nhập địa chỉ CCCD/CMND/HC");
          return false;
        }
        if (
          !this.certificate.clientInfo.createTimeCCCD ||
          !this.isValidDate(this.certificate.clientInfo.createTimeCCCD)
        ) {
          this.showMessage("Vui lòng nhập ngày cấp CCCD/CMND/HC");
          return false;
        }
        break;
      }
      case 3: {
        //Childrent
        if (!this.certificate.clientInfo.guardianName) {
          this.showMessage("Vui lòng nhập họ tên người giám hộ");
          return false;
        }
        break;
      }
      default:
        return false;
    }
    return true;
  }
  save(): void {
    if (!this.validate()) {
      return;
    }
    this.certificate.clientInfo.commune = this.communes.find(
      (c) => c.id == this.certificate.clientInfo.communeId
    ).name;
    this.certificate.clientInfo.district = this.districts.find(
      (c) => c.id == this.certificate.clientInfo.districtId
    ).name;
    this.certificate.clientInfo.province = this.provinces.find(
      (c) => c.id == this.certificate.clientInfo.provinceId
    ).name;
    this.certificate.clientInfo.cameraCapturePath = this.captureImage;
    this.saving = true;
    this.certificateServiceServiceProxy.create(this.certificate).subscribe(
      (result: CreateCertificateDto) => {
        this.notify.info(this.l("Lưu thành công."));
        this.bsModalRef.hide();
        this.onSave.emit();
      },
      () => {
        this.saving = false;
      }
    );
  }
  captureImage = '';
  showCameraDialog(){
    let diaglog = this._modalService.show(
      CameraModalComponent,
      {
        class: "modal-lg",
        initialState: {
        },
      }
    );
    diaglog.content?.onSave.subscribe(s=>{
      this.captureImage = s;
    })
  }
}
