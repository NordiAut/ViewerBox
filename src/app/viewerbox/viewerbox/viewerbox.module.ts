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
import { TablengprimeComponent } from 'src/app/content/forgesources/forgesources/tablengprime/tablengprime.component';
import {TableModule} from 'primeng/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'primeng/api';
import {DialogModule} from 'primeng/dialog';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {ButtonModule} from 'primeng/button';
import { ViewerModule } from 'ng2-adsk-forge-viewer';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';






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
    TablengprimeComponent,

  ],
  imports: [
    Ng2SmartTableModule,
    HttpClientModule,
    TableModule,
    CommonModule,
    FormsModule,
    SharedModule,
    DialogModule,
    BrowserModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    ButtonModule,
    ViewerModule
  ],
  exports: [ViewerboxComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],

})
export class ViewerBoxModule { }
