import {Component, EventEmitter, Output} from '@angular/core';
import {Recipe} from "../recipe.model";

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrl: './recipes-list.component.scss'
})
export class RecipesListComponent {
  recipes: Recipe[] = [];
  @Output() onDisplayDetailsRequested = new EventEmitter<Recipe>();

  constructor() {
    this.addNewRecipe('spaghetti bolognaise 1', 'recette des spaghetti bolognaise maison', '../../../assets/img/spaghetti_bolognaise.jpg');
    this.addNewRecipe('spaghetti bolognaise 2', 'recette des spaghetti bolognaise maison', '../../../assets/img/spaghetti_bolognaise.jpg');
    this.addNewRecipe('spaghetti bolognaise 3', 'recette des spaghetti bolognaise maison', '../../../assets/img/spaghetti_bolognaise.jpg');
    this.addNewRecipe('spaghetti bolognaise 4', 'recette des spaghetti bolognaise maison', '../../../assets/img/spaghetti_bolognaise.jpg');

  }

  getLastId(): number {
    if (this.recipes?.length > 0) {
      return this.recipes.reduce((acc, curr, i, arr) => {
        return Math.max(acc, curr.id);
      }, Number.MIN_SAFE_INTEGER);
    }
    return 0;

  }

  addNewRecipe(name: string, img: string, description: string) {
    let lastId = this.getLastId();
    this.recipes.push(new Recipe(++lastId, name, img, description))
  }

  requestDisplayDetails(recipe: Recipe) {

    this.onDisplayDetailsRequested.emit(recipe);
  }


}
