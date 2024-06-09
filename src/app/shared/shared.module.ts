import { NgModule } from '@angular/core';
import { TableComponent } from './components/table/table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import {MatPaginatorModule} from '@angular/material/paginator';
import { DataNotFoundComponent } from './components/data-not-found/data-not-found.component';

const MODULES = [
  FormsModule,
  ReactiveFormsModule,
  MatTableModule,
  MatSortModule,
  NgxPaginationModule,
  MatPaginatorModule
]

const COMPONENTS = [
  TableComponent,
  DataNotFoundComponent
]

@NgModule({
  declarations: [
    COMPONENTS,
  ],
  imports: [
    ...MODULES,
    CommonModule
  ],
  exports: [
    ...MODULES,
    ...COMPONENTS
  ],
})
export class SharedModule { }
