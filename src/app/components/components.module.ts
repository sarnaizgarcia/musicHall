import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HomeLogoComponent } from './home-logo';
import { MenuOptionComponent } from './menu-option';

const components = [
  HomeLogoComponent,
  MenuOptionComponent
];

@NgModule({
  declarations: [ ...components ],
  imports: [ CommonModule, FormsModule ],
  exports: [ ...components ],
})
export class ComponentsModule {}
