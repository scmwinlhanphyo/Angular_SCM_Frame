import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialImportsModule } from 'src/app/angular-material-imports.module';

import { FooterRoutingModule } from './footer-routing.module';


@NgModule({
  declarations: [],
  imports: [
    AngularMaterialImportsModule,
    CommonModule,
    FooterRoutingModule
  ],
  exports: []
})
export class FooterModule { }
