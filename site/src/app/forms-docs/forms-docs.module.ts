import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { DirtyValuesDocsComponent } from './dirty-values-docs/dirty-values-docs.component';
import { FormObserverDocsComponent } from './form-observer-docs/form-observer-docs.component';
import { FormTypesDocsComponent } from './form-types-docs/form-types-docs.component';
import { FormsDocsRoutingModule } from './forms-docs-routing.module';
import { FormsDocsComponent } from './forms-docs.component';

@NgModule({
  imports: [
    CommonModule,
    FormsDocsRoutingModule,
    MatSidenavModule,
    MatListModule,
  ],
  declarations: [
    FormsDocsComponent,
    FormObserverDocsComponent,
    FormTypesDocsComponent,
    DirtyValuesDocsComponent,
  ],
})
export class FormsDocsModule {}
