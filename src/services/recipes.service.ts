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
    return this.http.delete(this.apiUrl + '/' + id + '.json')
      .subscribe(response => {
        this.updatedRecipes.next();
      });
  }
}
