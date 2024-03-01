// src/app/recipe-details/recipe-details.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
  recipeId: number | undefined;

  constructor(private route: ActivatedRoute, public recipeService: RecipeService, private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.recipeId = +params['id'];
      this.recipeService.getRecipeDetails(this.recipeId);
    });
  }

  goBackToSearch(): void {
    this.router.navigate(['/recipe-results']);
  }
}

