import {
  Component,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  Input
} from '@angular/core';


@Component({
  selector: 'mh-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})

export class UploadFileComponent implements OnInit, OnDestroy {

  @Output()
  public imageSelected: EventEmitter<File> = new EventEmitter<File>();

  @ViewChild('fileDropRef')
  public inputFile: ElementRef | undefined;

  @Input()
  public imageContent: string | null = null;

  public reader = new FileReader();

  private fileSelected: File | undefined;

  ngOnInit() {
    this.reader.addEventListener('loadend', this.getImageContent.bind(this));
  }

  private getImageContent (fileEvent: any) {
    this.imageContent = fileEvent.target.result;
  }

  public onFileDropped(event: FileList) {
    this.fileSelected = event[0];
    this.reader.readAsDataURL(event[0]);
    this.imageSelected.emit(event[0]);
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
      this.imageSelected.emit(event.target.files[0])
    }
  }

  ngOnDestroy() {
    this.reader.removeEventListener('loadend', this.getImageContent);
  }
}
