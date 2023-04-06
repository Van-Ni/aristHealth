import { Component, Injector, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IPagedResultDto, PagedRequestDto } from '@shared/paged-listing-component-base';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';
import { CreateDepartmentComponent } from './create-department/create-department.component';
import { EditDepartmentComponent } from './edit-department/edit-department.component';
import { DepartmentDto, DepartmentDtoPagedResultDto, DepartmentServiceServiceProxy } from '@shared/service-proxies/service-proxies';
class DeparmentViewModel{
  id: string;
  nameDeparment: string;
}
@Component({
  selector: 'app-deparment',
  templateUrl: './deparment.component.html',
  styleUrls: ['./deparment.component.css']
})
export class DeparmentComponent  {
  keyword = '';
  dropdownOpen: boolean = false;
  id: string;
  enterprises: IPagedResultDto<DeparmentViewModel>;

  createEnterprise(): void {
    this.showCreateOrEditEnterpriseDialog();
  }
  constructor(injector: Injector, private router: Router,private _modalService: BsModalService, private _departmentService: DepartmentServiceServiceProxy, private route: ActivatedRoute
  ) {
  }
  list=(request: PagedRequestDto, finishedCallback: Function)=>{
    this._departmentService
      .getAll("", request.skipCount,  request.maxResultCount)     
      .subscribe((result: DepartmentDtoPagedResultDto) => {
        //console.log(this.route.snapshot.params['id']);
        
        this.enterprises = {
          items: result.items.map(x => {
            const deparmentViewModel = new DeparmentViewModel();
            //deparmentViewModel.id = x.id;
            deparmentViewModel.nameDeparment = x.nameDepartment;
            return deparmentViewModel;
          }),
          totalCount: result.totalCount
        };
        console.log(this.enterprises);
        
        finishedCallback(this.enterprises);
      });
  }
  editEnterprise(enterprise: DeparmentViewModel): void {
    this.showCreateOrEditEnterpriseDialog(enterprise.id);
  }
  showCreateOrEditEnterpriseDialog(id?: string): void {
    let createOrEditEnterpriseDialog: BsModalRef;
    if (!id) {
      createOrEditEnterpriseDialog = this._modalService.show(
        CreateDepartmentComponent,
        {
          class: 'modal-lg',
        }
      );
    } else {
      createOrEditEnterpriseDialog = this._modalService.show(
        EditDepartmentComponent,
        {
          class: 'modal-lg',
          initialState: {
            id: id,
          },
        }
      );
    }

    // createOrEditRoleDialog.content.onSave.subscribe(() => {
    //   this.refresh();
    // });
  }
  onTableItemClick(entity: DeparmentViewModel){
    this.showCreateOrEditEnterpriseDialog(entity.id);
  }
  onDeleteItemTable(entity: DeparmentViewModel){
    console.log(entity.id)
    abp.message.confirm('DepartmentDeleteWarningMessage',  entity.id,
    (result: boolean) => {
      console.log(entity.id);
      if (result) {
        this._departmentService
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

