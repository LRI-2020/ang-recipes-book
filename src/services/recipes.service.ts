import {Recipe} from "../app/recipes/recipe.model";
import {Ingredient} from "../app/shared/ingredient";
import {ShoppingListService} from "./shopping-list.service";
import {Subject} from "rxjs";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {recipeToJs} from "../app/shared/helpers";

@Injectable()
export class RecipesService {

  apiUrl = 'https://ang-recipes-book-6b01a-default-rtdb.europe-west1.firebasedatabase.app/recipes';

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

  fetchRecipes() {
    let result: Recipe[] = [];
    return this.http.get<{ key: string, recipe: {description:string,imagePath:string,ingredients:Ingredient[],name:string} }>(this.apiUrl+'.json')
      .pipe(map(responseData => {
      for (let key in responseData) {
        let recipe = new Recipe(responseData[key].name,responseData[key].description,responseData[key].imagePath,responseData[key].ingredients,key);
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
    let bodyRequest = recipeToJs(name, description, img,ingredients);
    return this.http.post(this.apiUrl+'.json', bodyRequest).subscribe(response => {
      this.updatedRecipes.next();
      console.log('response for recipe stored :  ' + response);
    });
  }

  addIngredientToShoppingList(ingredients: Ingredient[]) {
    this.shoppingService.addIngredients(ingredients);
  }

  updateRecipe(id: string, newName: string, newDescription: string, newImage:string,newIngredients: Ingredient[]) {
    let bodyRequest = recipeToJs(newName, newDescription, newImage, newIngredients)
    return this.http.put(this.apiUrl+'/'+id+'.json',bodyRequest)
   .subscribe(response => {
      this.updatedRecipes.next();
      console.log('response for recipe stored :  ' + response);
    });

  }

  deleteRecipe(id: string) {
    let originalRecipeIndex = this.recipes.indexOf(this.recipes.find(r => r.id === id));
    this.recipes.splice(originalRecipeIndex, 1);
    this.updatedRecipes.next();
  }

}
