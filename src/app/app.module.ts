import { ViewerboxComponent } from './viewerbox/viewerbox/viewerbox.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewerBoxModule } from './viewerbox/viewerbox/viewerbox.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { HttpClientModule } from '@angular/common/http';
import {TableModule} from 'primeng/table';







@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ViewerBoxModule,
    Ng2SmartTableModule,
    TableModule
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
