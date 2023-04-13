import { AppComponentBase } from '../../shared/app-component-base';
import { Component, Injector, OnInit } from '@angular/core';
import { DataService } from "../services/data.service"
import { CertificateDto, CertificateGroupStatusDtoPagedResultDto, CertificateGroupStatusServiceServiceProxy, CertificateServiceServiceProxy, GetDataServiceServiceProxy, KhoaMatServiceServiceProxy, MedicationKeyResultDtoPagedResultDto } from '../../shared/service-proxies/service-proxies';
import { log } from 'console';
import { ActivatedRoute } from '@angular/router';

@Component({
    template: ''
})
export abstract class CertificateKeyValueComponentBase<TEntityDto> extends AppComponentBase implements OnInit {
    status = false;
    model: TEntityDto;
    data: CertificateGroupStatusDtoPagedResultDto;
    route: ActivatedRoute
    public group: string;
    public certificateId: string;
    constructor(
        injector: Injector,
        private dataService: DataService
    ) {
        super(injector);
        this.route = injector.get(ActivatedRoute);
    }

    ngOnInit(): void {
        this.certificateId = this.route.snapshot.params['id'];

        this.dataService.getGroupData()
            .subscribe((result: CertificateGroupStatusDtoPagedResultDto) => {

                if(result != null)
                {

                    if (result && result.items && result.items.some(i => i.group == this.group)) {
                        this.status = true;
                        this.data = result;

                    }
                }
            });
            this.dataService.getAllKeyData().subscribe((result: MedicationKeyResultDtoPagedResultDto) => {

                if(result != null)
                {
                    if (result && result.items) {
                        this.setViewModel(result);
                    }
                }
            });
    }
    abstract setViewModel(model: any);
}
