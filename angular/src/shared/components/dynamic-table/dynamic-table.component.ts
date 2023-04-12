import { KeyValue } from '@angular/common';
import { Component, EventEmitter, Injector, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { EntityDto, IPagedResultDto, PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.css']
})
export class DynamicTableComponent extends PagedListingComponentBase<EntityDto> {
  @Input() onList: Function;
  keyword: '';
  isActive: boolean | null;
  advancedFiltersVisible = false;
  protected list(request: PagedRequestDto, pageNumber: number, finishedCallback: Function): void {
    console.log("1");
    this.onList(request, (pageResult: IPagedResultDto<EntityDto>) => {
      request.sortting=this.keyword;
      console.log("sorrting",request);
      this.entity = pageResult.items;
      this.showPaging(pageResult, pageNumber);
        for (const key in pageResult.items[0]) {
          this.filter[key]=true;
        }
        finishedCallback();
    });    
  }
  protected delete(entity: EntityDto): void {
    throw new Error('Method not implemented.');
  }
  entity : EntityDto[] = [];

  @Output() onEdit: EventEmitter<EntityDto> = new EventEmitter();
  @Output() onDelete: EventEmitter<EntityDto> = new EventEmitter();
  @Output() onView: EventEmitter<EntityDto> = new EventEmitter();
  modalRef?: any;
  constructor(injector: Injector,private modalService: BsModalService, private fb: FormBuilder,private router: Router) {
    super(injector);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  filter : Record<string, boolean> = {
  };
  originalOrder = (a: KeyValue<string,boolean>, b: KeyValue<string,boolean>): number => {
    return 0;
  }
  updateCheckboxValue(key: string, checked: boolean) {
    this.filter[key] = checked;
  }

  clearFilters(): void {
    this.keyword = '';
    this.isActive = undefined;
    this.getDataPage(1);
  }

  editClicked(clickedEntry: EntityDto): void {
    this.onEdit.emit(clickedEntry);
  }
  deleteClicked(clickedEntry: EntityDto): void {
    this.onDelete.emit(clickedEntry);
    this.refresh();
  }
  viewProfile(clickedEntry: EntityDto): void {
    this.onView.emit(clickedEntry);
  }
}
