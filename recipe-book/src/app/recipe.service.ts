
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchService } from './search.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  apiKey = 'd390a5cd61744d39a2deebd9c361067';
  recipeResults: any[] = [];
  selectedRecipe: any = null;

  constructor(private http: HttpClient, private searchService: SearchService) {
    this.searchService.currentSearchText.subscribe(searchText => {
      if (searchText) {
        this.searchRecipes(searchText);
  }
});
}


  searchRecipes(searchText: string): void {
    const searchEndpoint = `https://api.spoonacular.com/recipes/complexSearch?query=${searchText}&number=5&apiKey=${this.apiKey}`;
    
    this.http.get(searchEndpoint).subscribe((data: any) => {
      this.recipeResults = data.results;
    });
  }

  getRecipeDetails(recipeId: number): void {
    const recipeInfoEndpoint = `https://api.spoonacular.com/recipes/${recipeId}/information?includeNutrition=false&apiKey=${this.apiKey}`;
    const imageEndpoint = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${this.apiKey}`;

    this.http.get(recipeInfoEndpoint).subscribe((data: any) => {
      this.selectedRecipe = {
        id: data.id,
        title: data.title,
        readyInMinutes: data.readyInMinutes,
        servings: data.servings,
        ingredients: data.extendedIngredients,
        instructions: [],
        image: ''
      };

      this.http.get(imageEndpoint).subscribe((imageData: any) => {
        this.selectedRecipe.image = imageData.image;
      });

      this.getRecipeInstructions(recipeId);
    });
  }

  private getRecipeInstructions(recipeId: number): void {
    const instructionsEndpoint = `https://api.spoonacular.com/recipes/${recipeId}/analyzedInstructions?apiKey=${this.apiKey}`;

    this.http.get(instructionsEndpoint).subscribe((data: any) => {
      if (data && data.length > 0 && data[0].steps) {
        this.selectedRecipe.instructions = data[0].steps;
      }

      this.showRecipeInformationAlert();
    });
  }

  private showRecipeInformationAlert(): void {
    const { title, readyInMinutes, servings, ingredients, instructions, image } = this.selectedRecipe;

    let ingredientList = '';
    ingredients.forEach((ingredient: any) => {
      ingredientList += `- ${ingredient.original}\n`;
    });

    let instructionsList = '';
    instructions.forEach((step: any) => {
      instructionsList += `${step.number}. ${step.step}\n`;
    });


  }
}
