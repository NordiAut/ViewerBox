import { Component, Input, OnInit } from '@angular/core';
import { URNSourceModel } from 'src/app/shared/URNSourceModel';

@Component({
  selector: 'app-sectioncenter',
  templateUrl: './sectioncenter.component.html',
  styleUrls: ['./sectioncenter.component.scss']
})
export class SectioncenterComponent implements OnInit {

  @Input() selectedUrnListModel?: URNSourceModel;

  constructor() { }

  ngOnInit(): void {

    this.selectedUrnListModel = null;

  }

}
