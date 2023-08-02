import { Component, Injector, Input, OnInit } from '@angular/core';
import { DataService } from '@app/services/data.service';
import { AppComponentBase } from '@shared/app-component-base';
import { CertificateGroupStatusDto, CreateMedicationKeyResultDto, ThanTietNieuServiceServiceProxy } from '@shared/service-proxies/service-proxies';
import { PermissionCheckerService } from 'abp-ng2-module';
interface ThanTietNieu2ViewModel {
  thantietnieu_selectbox_phanloai: string;
  thantietnieu_text_thantietnieu_noidung: string;
}
@Component({
  selector: 'app-than-tiet-nieu2',
  templateUrl: './than-tiet-nieu2.component.html',
  styleUrls: ['./than-tiet-nieu2.component.css']
})
export class ThanTietNieu2Component  extends AppComponentBase implements OnInit {
  than2: ThanTietNieu2ViewModel;
  @Input() Data: any;
  @Input() statusDataCheck: any;
  keys = [""];
  isEditable2= false;
  certificateId: string;
  certificateStatus: CertificateGroupStatusDto;
  status = false;
  notify: any;
  constructor( private _permissionChecker: PermissionCheckerService,private dataservice: DataService,private injector: Injector,private thanTietNieuServiceServiceProxy: ThanTietNieuServiceServiceProxy) {
    super(injector);
   }

  ngOnInit() {
    for (const item of this.statusDataCheck.items) {
      if(item.group == "ThanTietNieu")
      {
        this.status = true;
      }
    }
    this.certificateId = this.dataservice.getData();
    if(this._permissionChecker.isGranted("Pages.ThanTietNieu.Create")){
      this.isEditable2 = true;
    }
    let object = Object.fromEntries(new Map(this.Data.items.map(obj=>{
      return [obj.key, obj.value]
    })));
    this.than2 = object as unknown as ThanTietNieu2ViewModel;
  }
  save(): void{
    var inputhohap2s : CreateMedicationKeyResultDto[] = [];
    const item1 = new CreateMedicationKeyResultDto(
      {
        key: 'thantietnieu_selectbox_phanloai',
        value:  this.than2.thantietnieu_selectbox_phanloai|| '',
        certificateId: this.certificateId,  
        group: "ThanTietNieu",
      }
    );const item2 = new CreateMedicationKeyResultDto(
      {
        key: 'thantietnieu_text_thantietnieu_noidung',
        value:  this.than2.thantietnieu_text_thantietnieu_noidung|| '',
        certificateId: this.certificateId,
        group: "ThanTietNieu",
      }
    );
    inputhohap2s.push(item1);
    inputhohap2s.push(item2);
    if(this.status == true){
      this.thanTietNieuServiceServiceProxy.updateOrInsert(inputhohap2s).subscribe(
        () => {
          this.notify.info(this.l('SavedSuccessfully.'));
        },
      );
    }else{
      this.thanTietNieuServiceServiceProxy.createList(inputhohap2s).subscribe(
        () => {
          this.notify.info(this.l('SavedSuccessfully.'));
        },
      );
    }
  }
}
