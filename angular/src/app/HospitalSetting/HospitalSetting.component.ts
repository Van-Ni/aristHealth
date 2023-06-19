import { Md5 } from "./../../../node_modules/ts-md5/src/md5";
import { AppComponentBase } from "@shared/app-component-base";
import {
  HospitalSettingDto,
  HospitalSettingServiceServiceProxy,
} from "./../../shared/service-proxies/service-proxies";
import { Component, Injector, OnInit } from "@angular/core";
import { AbpValidationError } from "@shared/components/validation/abp-validation.api";

@Component({
  selector: "app-HospitalSetting",
  templateUrl: "./HospitalSetting.component.html",
  styleUrls: ["./HospitalSetting.component.css"],
})
export class HospitalSettingComponent
  extends AppComponentBase
  implements OnInit
{
  hospitalSettingDto: HospitalSettingDto;
  isDisable = true;
  saving = false;
  newPasswordValidationErrors: Partial<AbpValidationError>[] = [
    {
      name: "pattern",
      localizationKey:
        "PasswordsMustBeAtLeast8CharactersContainLowercaseUppercaseNumber",
    },
  ];
  confirmNewPasswordValidationErrors: Partial<AbpValidationError>[] = [
    {
      name: "validateEqual",
      localizationKey: "PasswordsDoNotMatch",
    },
  ];
  constructor(
    private _hospitalSettingProxy: HospitalSettingServiceServiceProxy,
    injector: Injector
  ) {
    super(injector);
  }

  ngOnInit() {
    this._hospitalSettingProxy.getSetting().subscribe((setting) => {
      this.hospitalSettingDto = setting;
    });
  }
  onPasswordChange(newPass: string) {
    this.hospitalSettingDto.passwordMD5 = Md5.hashStr(newPass);
  }
  updateSetting() {
    this.saving = true;
    this._hospitalSettingProxy
      .addOrUpdateSetting(this.hospitalSettingDto)
      .subscribe((r) => {
        this.hospitalSettingDto = r;
        this.saving = false;
        this.isDisable = true;
      });
  }
}
