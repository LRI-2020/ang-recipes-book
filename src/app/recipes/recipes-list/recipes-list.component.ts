import {Component, OnDestroy, OnInit} from '@angular/core';
import {Recipe} from "../recipe.model";
import {RecipesService} from "../../../services/recipes.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrl: './recipes-list.component.scss'
})
export class RecipesListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  updateRecipeSubscription: Subscription

  constructor(private recipesService: RecipesService) {
  }

  ngOnInit(): void {
    this.recipesService.fetchRecipes().subscribe(recipesData => {
      this.recipes = recipesData;
    });

    this.updateRecipeSubscription = this.recipesService.updatedRecipes.subscribe(() => {
      this.recipesService.fetchRecipes().subscribe(recipesData => {
        this.recipes = recipesData;
      });
    })
  }

  ngOnDestroy(): void {
    this.updateRecipeSubscription.unsubscribe();
  }


}
