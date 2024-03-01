
import { Component } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { SearchService } from '../search.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-recipe-search',
  templateUrl: './recipe-search.component.html',
  styleUrls: ['./recipe-search.component.css']
})
export class RecipeSearchComponent {
  searchText: string = '';
 

  constructor(private recipeService: RecipeService, private searchService: SearchService, private router: Router) {}

  searchRecipes(): void {
    this.recipeService.searchRecipes(this.searchText);
    this.searchService.updateSearchText(this.searchText);
    this.router.navigate(['/recipe-results']);
  }
}
