import {Recipe} from "../app/recipes/recipe.model";
import {EventEmitter} from "@angular/core";

export class RecipesService {

  private recipes: Recipe[] = [];
selectedRecipe=new EventEmitter<Recipe>();
  constructor() {
    this.addNewRecipe('spaghetti bolognaise 1', 'recette des spaghetti bolognaise maison', '../../../assets/img/spaghetti_bolognaise.jpg');
    this.addNewRecipe('spaghetti bolognaise 2', 'recette des spaghetti bolognaise maison', '../../../assets/img/spaghetti_bolognaise.jpg');
    this.addNewRecipe('spaghetti bolognaise 3', 'recette des spaghetti bolognaise maison', '../../../assets/img/spaghetti_bolognaise.jpg');
    this.addNewRecipe('spaghetti bolognaise 4', 'recette des spaghetti bolognaise maison', '../../../assets/img/spaghetti_bolognaise.jpg');
  }

  getRecipes(){
    return this.recipes.slice();
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

}
