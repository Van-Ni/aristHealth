import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-current-conclusion-type1',
  templateUrl: './current-conclusion-type1.component.html',
  styleUrls: ['./current-conclusion-type1.component.css']
})
export class CurrentConclusionType1Component implements OnInit {
  @Input() Data: any;
  @Input() statusDataCheck: any;
  data:  any;
  statusDataCheck1: any;
  constructor() { }

  ngOnInit() {
  }

}
