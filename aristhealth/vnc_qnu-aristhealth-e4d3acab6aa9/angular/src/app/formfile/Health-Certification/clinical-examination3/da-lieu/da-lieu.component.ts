import { Component, Injector, Input, OnInit } from '@angular/core';
import { DataService } from '@app/services/data.service';
import { AppComponentBase } from '@shared/app-component-base';
import { CertificateGroupStatusDto, CreateMedicationKeyResultDto, KhoaDalieuServiceServiceProxy, KhoaThanKinhServiceServiceProxy } from '@shared/service-proxies/service-proxies';
import { PermissionCheckerService } from 'abp-ng2-module';
interface DaLieu3ViewModel {
  dalieu_selectbox_phanloai: string;
  dalieu_text_dalieu_noidung: string;
}
@Component({
  selector: 'app-da-lieu',
  templateUrl: './da-lieu.component.html',
  styleUrls: ['./da-lieu.component.css']
})
export class DaLieuComponent  extends AppComponentBase implements OnInit {
  dalieu3: DaLieu3ViewModel;
  @Input() Data: any;
  keys = [""];
  isEditable= false;
  @Input() statusDataCheck: any;
  certificateId: string;
  certificateStatus: CertificateGroupStatusDto;
  status = false;
  notify: any;
  constructor( private _permissionChecker: PermissionCheckerService,private dataservice: DataService,private injector: Injector,private KhoaDalieuServiceServiceProxy: KhoaDalieuServiceServiceProxy) {
    super(injector);
   }

  ngOnInit() {
    for (const item of this.statusDataCheck.items) {
      if(item.group == "DaLieu")
      {
        this.status = true;
      }
    }
    this.certificateId = this.dataservice.getData();
    if(this._permissionChecker.isGranted("Pages.DaLieu.Create")){
      this.isEditable = true;
    }
    let object = Object.fromEntries(new Map(this.Data.items.map(obj=>{
      return [obj.key, obj.value]
    })));
    this.dalieu3 = object as unknown as DaLieu3ViewModel;
  }
  save(): void{
    var inputhohap2s : CreateMedicationKeyResultDto[] = [];
    const item1 = new CreateMedicationKeyResultDto(
      {
        key: 'dalieu_selectbox_phanloai',
        value:  this.dalieu3.dalieu_selectbox_phanloai|| '',
        certificateId: this.certificateId,  
        group: "DaLieu",
      }
    );const item2 = new CreateMedicationKeyResultDto(
      {
        key: 'dalieu_text_dalieu_noidung',
        value:  this.dalieu3.dalieu_text_dalieu_noidung|| '',
        certificateId: this.certificateId,
        group: "DaLieu",
      }
    );
    inputhohap2s.push(item1);
    inputhohap2s.push(item2);
    if(this.status == true){
      this.KhoaDalieuServiceServiceProxy.updateOrInsert(inputhohap2s).subscribe(
        () => {
          this.notify.info(this.l('SavedSuccessfully.'));
        },
      );
    }else{
      this.KhoaDalieuServiceServiceProxy.createList(inputhohap2s).subscribe(
        () => {
          this.notify.info(this.l('SavedSuccessfully.'));
        },
      );
    }
  }
}
