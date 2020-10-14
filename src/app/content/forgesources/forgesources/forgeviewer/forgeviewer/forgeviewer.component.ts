import { Component, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-forgeviewer',
  templateUrl: './forgeviewer.component.html',
  styleUrls: ['./forgeviewer.component.scss']
})
export class ForgeviewerComponent implements OnInit {

  @ViewChild('viewerbox') myviewerbox: any;


  constructor() { }

  ngOnInit(): void {

  }

  loadViewerbox(urn: string, type: string, urngroupkey: string): void {
    this.myviewerbox.loadViewerboxSingleUrn(urn, type, urngroupkey);
  }
}
