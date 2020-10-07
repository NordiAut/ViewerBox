import { ContentcenterComponent } from './../../contentcenter/contentcenter.component';
import { SidebarrightComponent } from './../../sidebarright/sidebarright.component';
import { SidebarleftComponent } from './../../sidebarleft/sidebarleft.component';
import { NgModule } from '@angular/core';
import { ForgesourcesComponent } from 'src/app/forgesources/forgesources/forgesources.component';
import { ForgeviewerComponent } from 'src/app/forgeviewer/forgeviewer/forgeviewer.component';
import { LoggingComponent } from 'src/app/logging/logging/logging.component';
import { NavbarComponent } from 'src/app/navbar/navbar/navbar.component';
import { ViewerboxComponent } from './viewerbox.component';



@NgModule({
  declarations: [
    LoggingComponent,
    ViewerboxComponent,
    NavbarComponent,
    ForgeviewerComponent,
    ForgesourcesComponent,
    SidebarleftComponent,
    SidebarrightComponent,
    ContentcenterComponent
  ],
  imports: [

  ],
  exports: [ViewerboxComponent]

})
export class ViewerBoxModule { }
