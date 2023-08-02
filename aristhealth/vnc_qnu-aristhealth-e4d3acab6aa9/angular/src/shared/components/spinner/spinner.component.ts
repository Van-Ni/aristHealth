import { Component, OnInit } from '@angular/core';
import { LoadingService } from '@app/services/loader/loading.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent{

  constructor(public loader: LoadingService) { }


}
