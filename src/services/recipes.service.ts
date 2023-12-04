import {Recipe} from "../app/recipes/recipe.model";
import {Ingredient} from "../app/shared/ingredient";
import {ShoppingListService} from "./shopping-list.service";
import {Subject} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable()
export class RecipesService {

  private recipes: Recipe[] = [];
  updatedRecipes = new Subject<void>();

  constructor(private shoppingService: ShoppingListService) {
    this.addNewRecipe(
      'spaghetti bolognaise',
      'recette des spaghetti bolognaise maison',
      '../../../assets/img/pexels-ketut-subiyanto-4349774.jpg',
      [
        new Ingredient('spaghettis', 500),
        new Ingredient('tomates', 15),
      ]);
    this.addNewRecipe(
      'risotto champignons',
      "risotto d'hiver aux pleurotes",
      '../../../assets/img/pexels-marta-dzedyshko-2067418.jpg',
      [
        new Ingredient('riz', 500),
        new Ingredient('pleurotes', 750),
      ]);
    this.addNewRecipe(
      'quiche poireaux',
      'quiche végétarienne aux poireaux et fromage',
      '../../../assets/img/pexels-malidate-van-839008.jpg',
      [
        new Ingredient('poireaux', 8),
        new Ingredient('oeufs', 5),
        new Ingredient('pâte', 1)
      ]);
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipeById(id: number) {
    return this.recipes.find(r => r.id === id);
  }

  getLastId(): number {
    if (this.recipes?.length > 0) {
      return this.recipes.reduce((acc, curr, i, arr) => {
        return Math.max(acc, curr.id);
      }, Number.MIN_SAFE_INTEGER);
    }
    return 0;

  }

  addNewRecipe(name: string, description: string, img: string, ingredients: Ingredient[]) {
    let lastId = this.getLastId();
    this.recipes.push(new Recipe(++lastId, name, description, img, ingredients))
  }

  addIngredientToShoppingList(ingredients: Ingredient[]) {
    this.shoppingService.addIngredients(ingredients);
  }

  updateRecipe(id: number, newName:string, newDescription:string) {
    this.recipes.find(r => r.id === id).name = newName;
    this.recipes.find(r => r.id === id).description = newDescription;
    console.log("NEw RECIPE : "  + JSON.stringify(this.recipes));
    this.updatedRecipes.next();
  }

}
