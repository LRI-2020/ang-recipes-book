import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Recipe} from "../recipe.model";
import {RecipesService} from "../../../services/recipes.service";

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrl: './recipes-list.component.scss'
})
export class RecipesListComponent implements OnInit {
  recipes: Recipe[] = [];

  constructor(private recipesService: RecipesService) {
  }



  requestDisplayDetails(recipe: Recipe) {
    this.recipesService.selectedRecipe.emit(recipe);
  }

  ngOnInit(): void {
    this.recipes=this.recipesService.getRecipes();
  }


}
