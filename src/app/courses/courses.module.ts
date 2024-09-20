import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ErrorDialogComponent } from '../shared/components/error-dialog/error-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

import { CoursesRoutingModule } from './courses-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    ErrorDialogComponent,
    ReactiveFormsModule,
    MatFormFieldModule
  ]
})
export class CoursesModule { }
