import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { HomeLogoComponent } from './home-logo';
import { MenuOptionComponent } from './menu-option';
import { MenuListComponent } from './menu-list';
import { MenuButtonComponent } from './menu-button';
import { NavBarComponent } from './nav-bar';
import { NiceInputComponent } from './nice-input';
import { AutocompleteComponent } from './autocomplete';
import { NiceButtonComponent } from './nice-button';
import { SearchArtistFormComponent } from './search-artist-form';
import { SeparatorComponent } from './separator';
import { ModalScreenComponent } from './modal-screen';
import { LoadingComponent } from './loading';
import { ModalWindowComponent } from './modal-window';
import { UploadFileComponent, DragnDropDirective } from './upload-file';
import { ArtistFormComponent } from './artist-form';
import { ModalMessage } from './modal-message';
import { CardInfoComponent } from './card-info';
import { PagGridComponent } from './pag-grid';
import { FilterTagComponent } from './filter-tag';
import { FiltersListComponent } from './filter-list';
import { NiceSelectComponent } from './nice-select';

const components = [
  HomeLogoComponent,
  MenuOptionComponent,
  MenuListComponent,
  MenuButtonComponent,
  NavBarComponent,
  NiceInputComponent,
  AutocompleteComponent,
  NiceButtonComponent,
  SearchArtistFormComponent,
  SeparatorComponent,
  ModalScreenComponent,
  LoadingComponent,
  ModalWindowComponent,
  UploadFileComponent,
  ArtistFormComponent,
  ModalMessage,
  CardInfoComponent,
  PagGridComponent,
  FilterTagComponent,
  FiltersListComponent,
  NiceSelectComponent
];

@NgModule({
  declarations: [ ...components, DragnDropDirective ],
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    ReactiveFormsModule,
    MatCardModule,
    InfiniteScrollModule
  ],
  exports: [ ...components, FormsModule ],
})

export class ComponentsModule {}
