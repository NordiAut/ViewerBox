import { Component, Input, OnInit } from '@angular/core';
import {
  ViewerOptions,
  ViewerInitializedEvent,
  DocumentChangedEvent,
  SelectionChangedEventArgs,
  Extension,
} from 'ng2-adsk-forge-viewer';

import { MyExtension } from './my-extension';


// We need to tell TypeScript that Autodesk exists as a variables/object somewhere globally
declare const Autodesk: any;

// Insert a token and a document URN here
// Then refresh the app
export const ACCESS_TOKEN = '317a5a88-d47b-4183-b3ec-4b8ae098586b';
export const DOCUMENT_URN = 'dXJuOmFkc2sud2lwZW1lYTpmcy5maWxlOnZmLmxzaW5Wck43UlNXbXlRSFBfMGlEcWc_dmVyc2lvbj0x';

@Component({
  selector: 'app-forgeviewer',
  templateUrl: './forgeviewer.component.html',
  styleUrls: ['./forgeviewer.component.scss']
})
export class ForgeviewerComponent implements OnInit {

  name = 'Angular Forge Viewer';
  public viewerOptions: ViewerOptions;
  public documentId: string;

  public ngOnInit(): void {
    this.viewerOptions = {
      initializerOptions: {
        env: 'AutodeskProduction',
        getAccessToken: (onGetAccessToken: (token: string, expire: number) => void) => {
          const expireTimeSeconds = 60 * 30;
          onGetAccessToken(ACCESS_TOKEN, expireTimeSeconds);
        },
        api: 'derivativeV2',
        enableMemoryManagement: true,
      },
      viewerConfig: {
        extensions: [
          'Autodesk.DocumentBrowser',
          MyExtension.extensionName,
        ],
        theme: 'bim-theme',
      },
      onViewerScriptsLoaded: () => {
        // Register a custom extension
        Extension.registerExtension(MyExtension.extensionName, MyExtension);
      },
      onViewerInitialized: (args: ViewerInitializedEvent) => {
        args.viewerComponent.DocumentId = DOCUMENT_URN;
      },
      // showFirstViewable: false,
      // headlessViewer: true,
    };
  }

  public selectionChanged(event: SelectionChangedEventArgs): void
  {
    console.log(event.dbIdArray);
  }

}
