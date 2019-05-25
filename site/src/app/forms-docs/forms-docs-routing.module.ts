import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DirtyValuesDocsComponent } from './dirty-values-docs/dirty-values-docs.component';
import { FormObserverDocsComponent } from './form-observer-docs/form-observer-docs.component';
import { FormTypesDocsComponent } from './form-types-docs/form-types-docs.component';
import { FormsDocsComponent } from './forms-docs.component';

const routes: Routes = [{
  path: '',
  component: FormsDocsComponent,
  children: [
    {
      path: 'form-observer',
      component: FormObserverDocsComponent,
    },
    {
      path: 'form-types',
      component: FormTypesDocsComponent,
    },
    {
      path: 'dirty-values',
      component: DirtyValuesDocsComponent,
    },
    {
      path: '',
      redirectTo: 'form-observer',
      pathMatch: 'full'
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormsDocsRoutingModule {}
