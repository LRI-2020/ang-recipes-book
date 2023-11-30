import {Component, ViewChild} from '@angular/core';
import {Recipe} from "./recipe.model";
import {RecipesService} from "../../services/recipes.service";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.scss',
  providers:[RecipesService]
})
export class RecipesComponent {
  selectedRecipe: Recipe;

  constructor(private recipesService:RecipesService) {

    this.recipesService.selectedRecipe.subscribe((recipe)=>{
      this.selectedRecipe = recipe;
    })
  }
}
