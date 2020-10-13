import { Component, Input, OnInit } from '@angular/core';
import { URNSourceModel } from 'src/app/shared/URNSourceModel';

@Component({
  selector: 'app-forgeviewer',
  templateUrl: './forgeviewer.component.html',
  styleUrls: ['./forgeviewer.component.scss']
})
export class ForgeviewerComponent implements OnInit {


  @Input() selectedUrnListModel?: URNSourceModel;

  constructor() { }

  ngOnInit(): void {

    this.selectedUrnListModel = null;

  }

}
