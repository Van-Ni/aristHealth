import { Component, Injector, Input, OnInit } from '@angular/core';
import { DataService } from '@app/services/data.service';
import { AppComponentBase } from '@shared/app-component-base';
import { CertificateGroupStatusDto, CreateMedicationKeyResultDto, KhoaThanKinhServiceServiceProxy } from '@shared/service-proxies/service-proxies';
import { PermissionCheckerService } from 'abp-ng2-module';
interface ThanKinhTamThan2ViewModel {
  thankinhtamthan_selectbox_phanloai: string;
  thankinhtamthan_text_thankinhtamthan_noidung: string;
}
@Component({
  selector: 'app-than-kinh-tam-than2',
  templateUrl: './than-kinh-tam-than2.component.html',
  styleUrls: ['./than-kinh-tam-than2.component.css']
})
export class ThanKinhTamThan2Component  extends AppComponentBase implements OnInit {
  thankinhtamthan2: ThanKinhTamThan2ViewModel;
  @Input() Data: any;
  @Input() statusDataCheck: any;
  keys = [""];
  isEditable2= false;
  certificateId: string;
  certificateStatus: CertificateGroupStatusDto;
  status = false;
  notify: any;
  constructor( private _permissionChecker: PermissionCheckerService,private dataservice: DataService,private injector: Injector,private khoaThanKinhServiceServiceProxy: KhoaThanKinhServiceServiceProxy) {
    super(injector);
   }

  ngOnInit() {
    for (const item of this.statusDataCheck.items) {
      if(item.group == "ThanKinh")
      {
        this.status = true;
      }
    }
    this.certificateId = this.dataservice.getData();
    if(this._permissionChecker.isGranted("Pages.ThanKinh.Create")){
      this.isEditable2 = true;
    }
    let object = Object.fromEntries(new Map(this.Data.items.map(obj=>{
      return [obj.key, obj.value]
    })));
    this.thankinhtamthan2 = object as unknown as ThanKinhTamThan2ViewModel;
  }
  save(): void{
    var inputhohap2s : CreateMedicationKeyResultDto[] = [];
    const item1 = new CreateMedicationKeyResultDto(
      {
        key: 'thankinhtamthan_selectbox_phanloai',
        value:  this.thankinhtamthan2.thankinhtamthan_selectbox_phanloai|| '',
        certificateId: this.certificateId,  
        group: "ThanKinh",
      }
    );const item2 = new CreateMedicationKeyResultDto(
      {
        key: 'thankinhtamthan_text_thankinhtamthan_noidung',
        value:  this.thankinhtamthan2.thankinhtamthan_text_thankinhtamthan_noidung|| '',
        certificateId: this.certificateId,
        group: "ThanKinh",
      }
    );
    inputhohap2s.push(item1);
    inputhohap2s.push(item2);
    if(this.status == true){
      this.khoaThanKinhServiceServiceProxy.updateOrInsert(inputhohap2s).subscribe(
        () => {
          this.notify.info(this.l('SavedSuccessfully.'));
        },
      );
    }else{
      this.khoaThanKinhServiceServiceProxy.createList(inputhohap2s).subscribe(
        () => {
          this.notify.info(this.l('SavedSuccessfully.'));
        },
      );
    }
  }
}
