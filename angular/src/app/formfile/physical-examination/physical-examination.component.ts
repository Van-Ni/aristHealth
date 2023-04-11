import { Component, Injector, Input, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CreateMedicationKeyResultDto, KhamTheLucServiceServiceProxy } from '@shared/service-proxies/service-proxies';
import { PermissionCheckerService } from 'abp-ng2-module';
class KhamTheLucViewModel {
  khamtheluc_text_cannang: string;
  khamtheluc_text_chieucao: string;
  khamtheluc_text_mach: string;
  khamtheluc_text_huyetap: string;
  khamtheluc_text_phanloaitheluc: string;
}
@Component({
  selector: 'app-physical-examination',
  templateUrl: './physical-examination.component.html',
  styleUrls: ['./physical-examination.component.css']
})
export class PhysicalExaminationComponent extends AppComponentBase implements OnInit {
  khamtheluc: KhamTheLucViewModel;
  @Input() Data: any;
  keys = [""];
  isEditable= false;
  constructor(private _permissionChecker: PermissionCheckerService,private injector: Injector,private khamTheLucServiceServiceProxy: KhamTheLucServiceServiceProxy) { 
    super(injector);
  }
  ngOnInit() {
    if(this._permissionChecker.isGranted("Pages.KhamTheLuc.Create")){
      this.isEditable = true;
      console.log(this.isEditable) 
    }
    let object = Object.fromEntries(new Map(this.Data.items.map(obj=>{
      return [obj.key, obj.value]
    })));
    this.khamtheluc = object as unknown as KhamTheLucViewModel;
  }
  save(): void{
    var inputmat1s : CreateMedicationKeyResultDto[] = [];
    for (const key in this.khamtheluc) {
      if (Object.prototype.hasOwnProperty.call(this.khamtheluc, key)) {
        const element = this.khamtheluc[key];
        inputmat1s.push(new CreateMedicationKeyResultDto({
          key: key,
          value:  element,
          group: "KhamTheLuc",
          certificateId: 'f4e1980b-40d9-49d5-9c59-7a364ced6253',
        }));        
      }
    }
    this.khamTheLucServiceServiceProxy.createList(inputmat1s).subscribe(
      () => {
        
        this.notify.info(this.l('SavedSuccessfully.'));
      },
      
    );
  }
}
