import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragAndDropComponent } from './drag-and-drop/drag-and-drop.component';
import { MaterialModule } from 'src/app/modules/material/material.module';
import { DirectivesModule } from '../directives/directives.module';



@NgModule({
  declarations: [
    DragAndDropComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    DirectivesModule
  ],
  exports: [
    DragAndDropComponent
  ]
})
export class SharedComponentsModule { }
