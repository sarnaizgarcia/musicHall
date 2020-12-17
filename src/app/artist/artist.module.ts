import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ArtistRoutingModule } from './artist-routing.module';
import { ArtistComponent } from './artist.component';
import { ComponentsModule } from '../components';

@NgModule({
  declarations: [ ArtistComponent ],
  imports: [ CommonModule, ArtistRoutingModule, ComponentsModule ],
  exports: [ ArtistRoutingModule ]
})
export class ArtistModule {}
