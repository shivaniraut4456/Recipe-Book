
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-recipe-results',
  templateUrl: './recipe-results.component.html',
  styleUrls: ['./recipe-results.component.css']
})
export class RecipeResultsComponent {
  
  searchText: string = '';

  constructor(public recipeService: RecipeService, private router: Router, private searchService: SearchService,) {}
  
  ngOnInit() {
    this.searchService.currentSearchText.subscribe(searchText => {
      this.searchText = searchText;
      this.recipeService.searchRecipes(searchText); // Update the recipe results based on the searched text
    });
  }

  showRecipeInformation(recipeId: number): void {
    this.recipeService.getRecipeDetails(recipeId);
    this.router.navigate(['/recipe-details', recipeId ]);
  }
}
