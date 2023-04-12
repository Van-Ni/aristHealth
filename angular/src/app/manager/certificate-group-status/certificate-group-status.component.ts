import { Component, Injector, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IPagedResultDto, PagedRequestDto } from '@shared/paged-listing-component-base';
import { CertificateTypeServiceServiceProxy, CertificateGroupStatusServiceServiceProxy, CertificateGroupStatusDtoPagedResultDto } from '@shared/service-proxies/service-proxies';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';
import { CreateCertificateGroupStatusComponent } from './create-certificate-group-status/create-certificate-group-status.component';
import { EditCertificateGroupStatusComponent } from './edit-certificate-group-status/edit-certificate-group-status.component';
class CertificateGroupStatusViewModel{
  id: string;
  CertificateId: string;
  Group: string;
  status: boolean;
  UserId: number;
}
@Component({
  selector: 'app-certificate-group-status',
  templateUrl: './certificate-group-status.component.html',
  styleUrls: ['./certificate-group-status.component.css']
})
export class CertificateGroupStatusComponent  {
  keyword = '';
  dropdownOpen: boolean = false;
  id: number;
  certificateGroupStatus: IPagedResultDto<CertificateGroupStatusViewModel>;

  createCertificateGroupStatus(): void {
    this.showCreateOrEditCertificateGroupStatusDialog();
  }
  constructor(injector: Injector, private router: Router,private _modalService: BsModalService, private certificateGroupStatusServiceServiceProxy: CertificateGroupStatusServiceServiceProxy, private route: ActivatedRoute
  ) {
  }
  list=(request: PagedRequestDto, finishedCallback: Function)=>{
    this.certificateGroupStatusServiceServiceProxy
      .getAll("")     
      .subscribe((result: CertificateGroupStatusDtoPagedResultDto) => {
        this.certificateGroupStatus = {
          items: result.items.map(x => {
            const certificateGroupStatusViewModel = new CertificateGroupStatusViewModel();
            certificateGroupStatusViewModel.id = x.id;
            certificateGroupStatusViewModel.CertificateId = x.certificateId;
            certificateGroupStatusViewModel.Group = x.group;
            certificateGroupStatusViewModel.status = x.status;
            certificateGroupStatusViewModel.UserId = x.userId;
            return certificateGroupStatusViewModel;
          }),
          totalCount: result.totalCount
        };
        console.log(this.certificateGroupStatus);
        
        finishedCallback(this.certificateGroupStatus);
      });
  }
  editCertificateGroupStatus(entity: CertificateGroupStatusViewModel): void {
    this.showCreateOrEditCertificateGroupStatusDialog(entity.id);
  }
  showCreateOrEditCertificateGroupStatusDialog(id?: string): void {
    let createOrEditCertificateGroupStatusDialog: BsModalRef;
    if (!id) {
      createOrEditCertificateGroupStatusDialog = this._modalService.show(
        CreateCertificateGroupStatusComponent,
        {
          class: 'modal-lg',
        }
      );
    } else {
      createOrEditCertificateGroupStatusDialog = this._modalService.show(
        EditCertificateGroupStatusComponent,
        {
          class: 'modal-lg',
          initialState: {
            id: id,
          },
        }
      );
    }

  }
  onTableItemClick(entity: CertificateGroupStatusViewModel){
    this.showCreateOrEditCertificateGroupStatusDialog(entity.id);
  }
  onDeleteItemTable(entity: CertificateGroupStatusViewModel){
    abp.message.confirm('CertificateTypeDeleteWarningMessage',  entity.id.toString(),
    (result: boolean) => {
      console.log(entity.id);
      if (result) {
        this.certificateGroupStatusServiceServiceProxy
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
