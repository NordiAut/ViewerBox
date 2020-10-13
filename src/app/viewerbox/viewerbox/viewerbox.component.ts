import { Component, OnInit } from '@angular/core';
import { URNSourceModel } from 'src/app/shared/URNSourceModel';

@Component({
  selector: 'app-viewerbox',
  templateUrl: './viewerbox.component.html',
  styleUrls: ['./viewerbox.component.scss']
})
export class ViewerboxComponent implements OnInit {

  selectedUrnListModel?: URNSourceModel;
  isSelected: boolean;

  constructor() { }

  ngOnInit(): void {
    this.isSelected = false;
  }

  receiveUrnSourceModel($event): void{

    this.isSelected = true;
    this.selectedUrnListModel = $event;
    // console.log(this.selectedUrnListModel);

  }

}
