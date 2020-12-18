import {
  Directive,
  HostListener,
  HostBinding,
  Output,
  EventEmitter
} from '@angular/core';

@Directive({
  selector: '[mh-dnd]',
})
export class DragnDropDirective {
  @HostBinding('class.fileover')
  public fileOver: boolean = false;

  @Output()
  public fileDropped: EventEmitter<FileList> = new EventEmitter<FileList>();

  @HostListener('dragover', ['$event'])
  public onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.fileOver = true;
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.fileOver = false;
  }

  @HostListener('drop', ['$event'])
  public onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.fileOver = false;
    const files = event.dataTransfer?.files;

    if (files && files?.length > 0) {
      this.fileDropped.emit(files);
    }
  }
}
