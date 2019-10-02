import { NgModule } from '@angular/core';
import { DlJsonViewerComponent } from './dl-json-viewer.component';
import { DataViewerComponent } from './data-viewer/data-viewer.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    DlJsonViewerComponent,
    DataViewerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [DlJsonViewerComponent]
})
/**
 * Import this module to use this library.
 */
export class DLJsonViewerModule { }
