import {Recipe} from "../app/recipes/recipe.model";
import {Ingredient} from "../app/shared/ingredient";
import {ShoppingListService} from "./shopping-list.service";
import {Subject} from "rxjs";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable()
export class RecipesService {

  apiUrl = 'https://ang-recipes-book-6b01a-default-rtdb.europe-west1.firebasedatabase.app/recipes.json';

  private recipes: Recipe[] = [
    new Recipe('spaghetti bolognaise',
      'recette des spaghetti bolognaise maison',
      '../../../assets/img/pexels-ketut-subiyanto-4349774.jpg',
      [
        new Ingredient('spaghettis', 500),
        new Ingredient('tomates', 15),
      ], '1'),
    new Recipe(
      'risotto champignons',
      "risotto d'hiver aux pleurotes",
      '../../../assets/img/pexels-marta-dzedyshko-2067418.jpg',
      [
        new Ingredient('riz', 500),
        new Ingredient('pleurotes', 750),
      ], '2'),
    new Recipe(
      'quiche poireaux',
      'quiche végétarienne aux poireaux et fromage',
      '../../../assets/img/pexels-malidate-van-839008.jpg',
      [
        new Ingredient('poireaux', 8),
        new Ingredient('oeufs', 5),
        new Ingredient('pâte', 1)
      ], '3')];
  updatedRecipes = new Subject<void>();

  constructor(private shoppingService: ShoppingListService, private http: HttpClient) {

  }

  getRecipes() {
    return this.recipes.slice();
  }

  fetchRecipes() {
    let result: Recipe[] = [];
    return this.http.get<{ key: string, recipe: Recipe }>(this.apiUrl).pipe(map(responseData => {
      for (let key in responseData) {
        let recipe = responseData[key] as Recipe;
        result.push(recipe);
      }
      console.log('result in subscription ' + JSON.stringify(result))
      return result;

    }));

  }

  getRecipeById(id: string) {
    return this.fetchRecipes().pipe(map(recipes => {
        return recipes.find(r => r.id === id);
    }))
  }

  storeRecipe(name: string, description: string, img: string, ingredients: Ingredient[]) {
    let recipe = new Recipe(name, description, img, ingredients);
    let ingredientsToJs = [];

    recipe.ingredients.forEach(ing => ingredientsToJs.push(
      {
        id: ing.id,
        name: ing.name,
        amount: ing.amount
      })
    )

    let bodyRequest = {
      id: recipe.id,
      name: recipe.name,
      description: recipe.description,
      imagePath: recipe.imagePath,
      ingredients: ingredientsToJs
    }

    return this.http.post(this.apiUrl, bodyRequest).subscribe(response => {
      this.updatedRecipes.next();
      console.log('response for recipe stored :  ' + response);
    });
  }

  addIngredientToShoppingList(ingredients: Ingredient[]) {
    this.shoppingService.addIngredients(ingredients);
  }

  updateRecipe(id: string, newRecipe: Recipe) {
    console.log('new ingredients before update : ' + JSON.stringify(newRecipe));

    let originalRecipe = this.recipes.find(r => r.id === id);
    originalRecipe.name = newRecipe.name;
    originalRecipe.description = newRecipe.description;
    originalRecipe.ingredients = newRecipe.ingredients;
    console.log('recipe after update : ' + JSON.stringify(originalRecipe))
    this.updatedRecipes.next();
  }

  deleteRecipe(id: string) {
    let originalRecipeIndex = this.recipes.indexOf(this.recipes.find(r => r.id === id));
    this.recipes.splice(originalRecipeIndex, 1);
    this.updatedRecipes.next();
  }
}
