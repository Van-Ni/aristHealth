import { Component, Injector, Input, OnInit } from '@angular/core';
import { DataService } from '@app/services/data.service';
import { AppComponentBase } from '@shared/app-component-base';
import { CertificateGroupStatusDto, CreateMedicationKeyResultDto, KhoaNoiTietServiceServiceProxy } from '@shared/service-proxies/service-proxies';
import { PermissionCheckerService } from 'abp-ng2-module';
interface NoiTiet1ViewModel {
  noitiet_selectbox_phanloai: string;
  noitiet_text_noitiet_ketluan: string;
}
@Component({
  selector: 'app-noi-tiet1',
  templateUrl: './noi-tiet1.component.html',
  styleUrls: ['./noi-tiet1.component.css']
})
export class NoiTiet1Component  extends AppComponentBase implements OnInit {
  noitiet1: NoiTiet1ViewModel;
  @Input() statusDataCheck: any;
  @Input() Data: any;
  keys = [""];
  isEditable4= false;
  certificateId: string;
  certificateStatus: CertificateGroupStatusDto;
  status = false;
  constructor(private _permissionChecker: PermissionCheckerService,private dataservice: DataService,private injector: Injector, private khoaNoiTietServiceServiceProxy: KhoaNoiTietServiceServiceProxy) { 
    super(injector)
  }

  ngOnInit() {
    for (const item of this.statusDataCheck.items) {
      if(item.group == "NoiTiet")
      {
        this.status = true;
      }
    }
    this.certificateId = this.dataservice.getData();
    if(this._permissionChecker.isGranted("Pages.NoiTiet.Create")){
      this.isEditable4 = true;
    }
    let object = Object.fromEntries(new Map(this.Data.items.map(obj=>{
      return [obj.key, obj.value]
    })));
    this.noitiet1 = object as unknown as NoiTiet1ViewModel;
  }
  save(): void{
    var inputnoitiet1s : CreateMedicationKeyResultDto[] = [];
    const item1 = new CreateMedicationKeyResultDto(
      {
        key: 'noitiet_selectbox_phanloai',
        value:  this.noitiet1.noitiet_selectbox_phanloai|| '',
        certificateId: this.certificateId,  
        group: "NoiTiet",
      }
    );const item2 = new CreateMedicationKeyResultDto(
      {
        key: 'noitiet_text_noitiet_ketluan',
        value:  this.noitiet1.noitiet_text_noitiet_ketluan|| '',
        certificateId: this.certificateId,
        group: "NoiTiet",
      }
    );
    inputnoitiet1s.push(item1);
    inputnoitiet1s.push(item2);
    if(this.status == true){
      this.khoaNoiTietServiceServiceProxy.updateOrInsert(inputnoitiet1s).subscribe(
        () => {
          this.notify.info(this.l('SavedSuccessfully.'));
        },
      );
    }else{
      this.khoaNoiTietServiceServiceProxy.createList(inputnoitiet1s).subscribe(
        () => {
          this.notify.info(this.l('SavedSuccessfully.'));
        },
      );
    }
  }

}
