import { ViewerboxComponent } from './viewerbox/viewerbox/viewerbox.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewerBoxModule } from './viewerbox/viewerbox/viewerbox.module';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ViewerBoxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
