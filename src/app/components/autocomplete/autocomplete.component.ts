import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'mh-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css']
})
export class AutocompleteComponent implements OnInit, OnDestroy{
  @Input()
  public listValues: string[] = [];

  @Input()
  public autocompleteResize: Observable<string> | undefined;

  @Output()
  public valueSelected: EventEmitter<string> = new EventEmitter<string>();

  public autocompleteSize: string = '100%';

  private subscriptions: Subscription[] = [];

  get areValues() {
    return this.listValues.length > 0;
  }

  ngOnInit() {
    if (this.autocompleteResize) {
      this.subscriptions.push(
        this.autocompleteResize
        .subscribe((value: string) => {
          console.log('NNN value: ', value);
          this.autocompleteSize = value;
        })
      );
    }
  }

  ngOnDestroy() {
    for (const subcription of this.subscriptions) {
      subcription.unsubscribe();
    }
  }

  public onValueClick(value: string) {
    this.valueSelected.emit(value);
  }

  public onValueEnter(event: KeyboardEvent, value: string) {
    if (event.key === 'Enter') {
      this.valueSelected.emit(value);
    }
  }
}
