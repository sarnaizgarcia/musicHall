import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsModule } from '../components';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [ HomeComponent ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ComponentsModule
  ],
  exports: [ HomeRoutingModule ],
})
export class HomeModule {}
