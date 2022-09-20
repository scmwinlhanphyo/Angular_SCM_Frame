import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { ListModule } from 'src/app/components/list/list.module';
import { AngularMaterialImportsModule } from 'src/app/angular-material-imports.module';

import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ListModule,
    AngularMaterialImportsModule
  ]
})
export class HomeModule { }
