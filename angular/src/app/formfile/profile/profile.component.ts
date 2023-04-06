import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientInfoServiceServiceProxy } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  addorEditProfile!: FormGroup;
  constructor(private fb: FormBuilder, private clientInfo: ClientInfoServiceServiceProxy) { }
  ngOnInit() {
    this.addorEditProfile = this.fb.group({
      FullName: new FormControl(null, Validators.required),
      Sex: new FormControl(null, Validators.required),
      CCCD: new FormControl(null, Validators.required),
      DateOfBirth: new FormControl(null, Validators.required),
      CreateTimeCCCD: new FormControl(null, Validators.required),
      AddressCCCD: new FormControl(null, Validators.required),
      Address: new FormControl(null, Validators.required),
      GuardianName: new FormControl(null),
    });
  }
  submitForm(addorEditProfile: any)
  {
    console.log(addorEditProfile.value);
    this.clientInfo.create(addorEditProfile.value);
  }
}
