import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

import { HomeLogoComponent } from './home-logo';
import { MenuOptionComponent } from './menu-option';
import { MenuListComponent } from './menu-list';
import { MenuButtonComponent } from './menu-button';
import { NavBarComponent } from './nav-bar';
import { NiceInputComponent } from './nice-input';
import { AutocompleteComponent } from './autocomplete';

const components = [
  HomeLogoComponent,
  MenuOptionComponent,
  MenuListComponent,
  MenuButtonComponent,
  NavBarComponent,
  NiceInputComponent,
  AutocompleteComponent
];

@NgModule({
  declarations: [ ...components ],
  imports: [ CommonModule, FormsModule, MatIconModule ],
  exports: [ ...components, FormsModule ],
})
export class ComponentsModule {}
