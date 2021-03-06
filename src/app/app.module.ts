import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MapViewerComponent } from './components/map-viewer/map-viewer.component';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    MapViewerComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
