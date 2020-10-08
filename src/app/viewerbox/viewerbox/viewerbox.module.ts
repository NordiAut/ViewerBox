import { NgModule } from '@angular/core';
import { ForgesourcesComponent } from 'src/app/forgesources/forgesources/forgesources.component';
import { ForgeviewerComponent } from 'src/app/forgeviewer/forgeviewer/forgeviewer.component';
import { LoggingComponent } from 'src/app/logging/logging/logging.component';
import { NavbarComponent } from 'src/app/navbar/navbar/navbar.component';
import { ViewerboxComponent } from './viewerbox.component';
import { Ng2SmartTableModule  } from 'ng2-smart-table';
import { TableComponent} from 'src/app/table/table.component';
import { ContentcenterComponent } from 'src/app/sections/contentcenter/contentcenter.component';
import { SidebarrightComponent } from 'src/app/sections/sidebarright/sidebarright.component';
import { SidebarleftComponent } from 'src/app/sections/sidebarleft/sidebarleft.component';
import { HttpClientModule } from '@angular/common/http';




@NgModule({
  declarations: [
    LoggingComponent,
    ViewerboxComponent,
    NavbarComponent,
    ForgeviewerComponent,
    ForgesourcesComponent,
    SidebarleftComponent,
    SidebarrightComponent,
    ContentcenterComponent,
    TableComponent
  ],
  imports: [
    Ng2SmartTableModule,
    HttpClientModule
  ],
  exports: [ViewerboxComponent]

})
export class ViewerBoxModule { }
