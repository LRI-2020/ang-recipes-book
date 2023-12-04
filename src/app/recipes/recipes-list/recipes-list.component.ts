import {Component, OnDestroy, OnInit} from '@angular/core';
import {Recipe} from "../recipe.model";
import {RecipesService} from "../../../services/recipes.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrl: './recipes-list.component.scss'
})
export class RecipesListComponent implements OnInit, OnDestroy{
  recipes: Recipe[] = [];
  updateRecipeSubscription:Subscription

  constructor(private recipesService: RecipesService) {
  }

  ngOnInit(): void {
    this.recipes=this.recipesService.getRecipes();
    this.updateRecipeSubscription = this.recipesService.updatedRecipes.subscribe(()=>{
      this.recipes=this.recipesService.getRecipes();
    })
  }

  ngOnDestroy(): void {
    this.updateRecipeSubscription.unsubscribe();
  }


}
