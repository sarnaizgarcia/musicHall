import { Component,
  ElementRef,
  Input,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';

import { FileData } from './upload-file.entities';

@Component({
  selector: 'mh-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})

export class UploadFileComponent implements OnInit, OnDestroy {

  @Output()
  public imageSelected: EventEmitter<FileData> = new EventEmitter<FileData>();

  @ViewChild('fileDropRef')
  public inputFile: ElementRef | undefined;

  @Input()
  public imageContent: string | null = null;
  
  public reader = new FileReader();
  private fileSelected: File | undefined;
  private context = this.getImageContent.bind(this);

  ngOnInit() {
    this.reader.addEventListener('loadend', this.context);
  }

  ngOnDestroy() {
    this.reader.removeEventListener('loadend', this.context);
  }

  private getImageContent (fileEvent: any) {
    this.imageContent = fileEvent.target.result;
    this.imageSelected.emit({
      fileName: (this.fileSelected) ? this.fileSelected.name : '',
      content: fileEvent.target.result
    })
  }

  public onFileDropped(event: FileList) {
    this.fileSelected = event[0];
    this.reader.readAsDataURL(event[0]);
  }

  public clickOnFileUpload() {
    if (this.inputFile) {
      this.inputFile.nativeElement.click();
    }
  }

  public enterOnFileUpload(event: KeyboardEvent) {
    if (this.inputFile && event.key === 'Enter') {
      this.inputFile.nativeElement.click();
    }
  }

  public onInputFileChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.fileSelected = event.target.files[0];
      this.reader.readAsDataURL(event.target.files[0]);
    }
  }
}
