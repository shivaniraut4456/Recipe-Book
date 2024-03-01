

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { RecipeResultsComponent } from './recipe-results/recipe-results.component';


const routes: Routes = [
  { path: '', redirectTo: '/recipe-search', pathMatch: 'full' },
  
  { path: 'recipe-results', component: RecipeResultsComponent },
  { path: 'recipe-details/:id', component: RecipeDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
