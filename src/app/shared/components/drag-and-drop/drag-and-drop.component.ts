import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-drag-and-drop',
  templateUrl: './drag-and-drop.component.html',
  styleUrls: ['./drag-and-drop.component.scss']
})
export class DragAndDropComponent {
  @Output() private dropFiles : EventEmitter<FileList> = new EventEmitter();


  public onFileChange(event: FileList){
    this.dropFiles.emit(event)    
  }
}
