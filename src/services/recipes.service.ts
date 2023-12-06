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

  getRecipeById(id: string) {
    return this.recipes.find(r => r.id === id);
  }

   addNewRecipe(name: string, description: string, img: string, ingredients: Ingredient[]) {
    this.recipes.push(new Recipe(name, description, img, ingredients))
  }

  addIngredientToShoppingList(ingredients: Ingredient[]) {
    this.shoppingService.addIngredients(ingredients);
  }

  updateRecipe(id: string, newRecipe:Recipe) {
    console.log('new ingredients before update : ' + JSON.stringify(newRecipe));

    let originalRecipe = this.recipes.find(r => r.id === id);
    originalRecipe.name = newRecipe.name;
    originalRecipe.description = newRecipe.description;
    originalRecipe.ingredients = newRecipe.ingredients;
    console.log('recipe after update : ' + JSON.stringify(originalRecipe))
    this.updatedRecipes.next();
  }

  // updateRecipe(id: number, newName:string, newDescription:string) {
  //   this.recipes.find(r => r.id === id).name = newName;
  //   this.recipes.find(r => r.id === id).description = newDescription;
  //   console.log("NEw RECIPE : "  + JSON.stringify(this.recipes));
  //   this.updatedRecipes.next();
  // }

}
