import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialImportsModule } from 'src/app/angular-material-imports.module';

import { ListRoutingModule } from './list-routing.module';
import { ListComponent } from './list.component';


@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    ListRoutingModule,
    AngularMaterialImportsModule
  ],
  exports: [ ListComponent ]
})
export class ListModule { }
