import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[fileDragDrop]'
})
export class FileDragDropDirective {
  @Output() private dropFiles : EventEmitter<FileList> = new EventEmitter();

  
  @HostBinding('style.background') private background = '#eee';
  @HostBinding('style.border') private borderStyle = '2px dashed';
  @HostBinding('style.border-color') private borderColor = '#696D7D';
  @HostBinding('style.border-radius') private borderRadius = '5px';


  @HostListener('dragover', ['$event']) public onDragOver(e : DragEvent){
    e.preventDefault();
    e.stopPropagation();
    this.background = 'lightgray';
    this.borderStyle = '2px solid';
  }

  @HostListener('dragleave', ['$event']) public onDragLeave(e : DragEvent){
    e.preventDefault();
    e.stopPropagation();
    this.background = '#eee';
    this.borderColor = '#696D7D';
    this.borderStyle = '2px dashed';
  }

  @HostListener('drop', ['$event']) public onDrop(e : DragEvent){
    e.preventDefault();
    e.stopPropagation();
    this.background = '#eee';
    this.borderColor = '#696D7D';
    this.borderStyle = '2px dashed';
    let files = e.dataTransfer?.files;
    if (!files) return;
    let valid_files : FileList = files;
    this.dropFiles.emit(valid_files);
  }
}
