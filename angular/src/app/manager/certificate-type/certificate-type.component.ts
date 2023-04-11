import { Component, Injector, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IPagedResultDto, PagedRequestDto } from '@shared/paged-listing-component-base';
import { CertificateDtoPagedResultDto, CertificateTypeDtoPagedResultDto, CertificateTypeServiceServiceProxy } from '@shared/service-proxies/service-proxies';
import { DepartmentServiceServiceProxy, DepartmentDtoPagedResultDto } from '@shared/service-proxies/service-proxies';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';
import { CreateCertificateTypeComponent } from './create-certificate-type/create-certificate-type.component';
import { EditCertificateTypeComponent } from './edit-certificate-type/edit-certificate-type.component';
class CertificateTypeViewModel{
  id: number;
  price: number;
  name: string;
  filePath: string;
  finalResult: string;
}
@Component({
  selector: 'app-certificate-type',
  templateUrl: './certificate-type.component.html',
  styleUrls: ['./certificate-type.component.css']
})
export class CertificateTypeComponent  {
  keyword = '';
  dropdownOpen: boolean = false;
  id: number;
  certificateTypes: IPagedResultDto<CertificateTypeViewModel>;

  createCertificateType(): void {
    this.showCreateOrEditCertificateTypeDialog();
  }
  constructor(injector: Injector, private router: Router,private _modalService: BsModalService, private certificateTypeServiceServiceProxy: CertificateTypeServiceServiceProxy, private route: ActivatedRoute
  ) {
  }
  list=(request: PagedRequestDto, finishedCallback: Function)=>{
    this.certificateTypeServiceServiceProxy
      .getAll("", request.skipCount,  request.maxResultCount)     
      .subscribe((result: CertificateTypeDtoPagedResultDto) => {
        this.certificateTypes = {
          items: result.items.map(x => {
            const certificateTypeViewModel = new CertificateTypeViewModel();
            certificateTypeViewModel.id = x.id;
            certificateTypeViewModel.name = x.name;
            certificateTypeViewModel.price = x.price;
            certificateTypeViewModel.filePath = x.filePath;
            certificateTypeViewModel.finalResult = x.finalResult;
            return certificateTypeViewModel;
          }),
          totalCount: result.totalCount
        };
        console.log(this.certificateTypes);
        
        finishedCallback(this.certificateTypes);
      });
  }
  editEnterprise(entity: CertificateTypeViewModel): void {
    this.showCreateOrEditCertificateTypeDialog(entity.id);
  }
  showCreateOrEditCertificateTypeDialog(id?: number): void {
    let createOrEditCertificateTypeDialog: BsModalRef;
    if (!id) {
      createOrEditCertificateTypeDialog = this._modalService.show(
        CreateCertificateTypeComponent,
        {
          class: 'modal-lg',
        }
      );
    } else {
      createOrEditCertificateTypeDialog = this._modalService.show(
        EditCertificateTypeComponent,
        {
          class: 'modal-lg',
          initialState: {
            id: id,
          },
        }
      );
    }

  }
  onTableItemClick(entity: CertificateTypeViewModel){
    this.showCreateOrEditCertificateTypeDialog(entity.id);
  }
  onDeleteItemTable(entity: CertificateTypeViewModel){
    abp.message.confirm('CertificateTypeDeleteWarningMessage',  entity.id.toString(),
    (result: boolean) => {
      console.log(entity.id);
      if (result) {
        this.certificateTypeServiceServiceProxy
          .delete(entity.id)
          .pipe(
            finalize(() => {
              abp.notify.success("DeleteSuccess");              
            })
          )
          .subscribe(() => {});
      }
    }
      
    );
  }
}

