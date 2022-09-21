import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HeaderRoutingModule } from './header-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HeaderRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class HeaderModule { }
