import { Component, Injector, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IPagedResultDto, PagedRequestDto } from '@shared/paged-listing-component-base';
import { DepartmentServiceServiceProxy, DepartmentDtoPagedResultDto, GroupServiceServiceProxy, GroupDtoPagedResultDto } from '@shared/service-proxies/service-proxies';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';
import { CreateDepartmentComponent } from '../deparment/create-department/create-department.component';
import { EditDepartmentComponent } from '../deparment/edit-department/edit-department.component';
import { CreateGroupComponent } from './create-group/create-group.component';
import { EditGroupComponent } from './edit-group/edit-group.component';
class GroupViewModel{
  id: string;
  name: string;
  departmentId: string;
}
@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent {
  keyword = '';
  dropdownOpen: boolean = false;
  id: string;
  enterprises: IPagedResultDto<GroupViewModel>;

  createGroup(): void {
    this.showCreateOrEditEnterpriseDialog();
  }
  constructor(injector: Injector, private router: Router,private _modalService: BsModalService, private _groupService: GroupServiceServiceProxy, private route: ActivatedRoute
  ) {
  }
  list=(request: PagedRequestDto, finishedCallback: Function)=>{
    this._groupService
      .getAll("", request.skipCount,  request.maxResultCount)     
      .subscribe((result: GroupDtoPagedResultDto) => {
        //console.log(this.route.snapshot.params['id']);
        
        this.enterprises = {
          items: result.items.map(x => {
            const groupViewModel = new GroupViewModel();
            //deparmentViewModel.id = x.id;
            groupViewModel.name = x.name;
            return groupViewModel;
          }),
          totalCount: result.totalCount
        };
        console.log(this.enterprises);
        
        finishedCallback(this.enterprises);
      });
  }
  editEnterprise(enterprise: GroupViewModel): void {
    this.showCreateOrEditEnterpriseDialog(enterprise.id);
  }
  showCreateOrEditEnterpriseDialog(id?: string): void {
    let createOrEditEnterpriseDialog: BsModalRef;
    if (!id) {
      createOrEditEnterpriseDialog = this._modalService.show(
        CreateGroupComponent,
        {
          class: 'modal-lg',
        }
      );
    } else {
      createOrEditEnterpriseDialog = this._modalService.show(
        EditGroupComponent,
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
  onTableItemClick(entity: GroupViewModel){
    this.showCreateOrEditEnterpriseDialog(entity.id);
  }
  onDeleteItemTable(entity: GroupViewModel){
    console.log(entity.id)
    abp.message.confirm('DepartmentDeleteWarningMessage',  entity.id,
    (result: boolean) => {
      console.log(entity.id);
      if (result) {
        this._groupService
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

