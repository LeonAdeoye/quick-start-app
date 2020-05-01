import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainGridComponent } from './components/main-grid/main-grid.component';
import { MainHeaderComponent } from './components/main-header/main-header.component';
import { AgGridModule } from 'ag-grid-angular';
import { LoggingService } from "./services/logging.service";
import { MessageService } from "./services/message.service";
import { ConfigurationService } from "./services/configuration.service";
import { BootstrapService } from "./services/bootstrap.service";
import { PopupService } from "./services/popup.service";
import { HttpClientModule } from "@angular/common/http";
import { MaterialModule } from './material.module';
import { FormsModule } from "@angular/forms";
import { DetailComponent } from "./components/detail/detail.component";


@NgModule({
  schemas:
  [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  declarations: [
    AppComponent,
    MainGridComponent,
    MainHeaderComponent,
    DetailComponent
  ],
  imports: [
    BrowserModule,
    AgGridModule.withComponents([]),
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FormsModule
  ],
  providers: [
    LoggingService,
    MessageService,
    ConfigurationService,
    BootstrapService,
    PopupService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
