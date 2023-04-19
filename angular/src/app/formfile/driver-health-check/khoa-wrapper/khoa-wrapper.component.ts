import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-khoa-wrapper',
  templateUrl: './khoa-wrapper.component.html',
  styleUrls: ['./khoa-wrapper.component.css']
})
export class KhoaWrapperComponent implements OnInit {
  expandStatus = true;
  @Input() title: string;
  @Input() status: number;
  constructor() { }

  ngOnInit() {
  }
  getBackgroundColor(status: number){
    switch(status)
    {
      case 0:
        return 'red';
      case 1:
        return 'green';
      case 2:
        return 'red';
      default:
        return 'black';
    }
  }
}
