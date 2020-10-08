import { NgModule } from '@angular/core';
import { ViewerboxComponent } from './viewerbox.component';
import { Ng2SmartTableModule  } from 'ng2-smart-table';
import { HttpClientModule } from '@angular/common/http';
import { SectioncenterComponent } from 'src/app/sections/sectioncenter/sectioncenter.component';
import { SectionleftComponent } from 'src/app/sections/sectionleft/sectionleft.component';
import { SectionrightComponent } from 'src/app/sections/sectionright/sectionright.component';
import { ForgeviewerComponent } from 'src/app/content/forgesources/forgesources/forgeviewer/forgeviewer/forgeviewer.component';
import { ForgesourcesComponent } from 'src/app/content/forgesources/forgesources/forgesources/forgesources.component';
import { LoggingComponent } from 'src/app/content/forgesources/forgesources/logging/logging/logging.component';
import { TableComponent } from 'src/app/content/forgesources/forgesources/table/table.component';




@NgModule({
  declarations: [
    LoggingComponent,
    ViewerboxComponent,
    ForgeviewerComponent,
    ForgesourcesComponent,
    TableComponent,
    SectioncenterComponent,
    SectionleftComponent,
    SectionrightComponent,
  ],
  imports: [
    Ng2SmartTableModule,
    HttpClientModule
  ],
  exports: [ViewerboxComponent]

})
export class ViewerBoxModule { }
