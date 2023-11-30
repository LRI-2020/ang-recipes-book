import {Ingredient} from "../app/shared/ingredient";
import {EventEmitter} from "@angular/core";

export class ShoppingListService{
  ingredients:Ingredient[]=[];
  onIngredientsChanged = new EventEmitter<void>();

  addIngredient(ingredient:Ingredient) {
    this.ingredients.push(ingredient);
    this.onIngredientsChanged.emit();
  }

  addIngredients(ingredients:Ingredient[]){
    this.ingredients.push(...ingredients);
    this.onIngredientsChanged.emit();
  }

  constructor() {
    // this.addIngredient('apple',5);
    // this.addIngredient('strawberries',50);
    // this.addIngredient('cherries',25);
  }

  getIngredientById(id:string){
    try{
      return this.ingredients.find(i => i.id===id);
    }
    catch(e){
      console.log('no ingredient found for id : ' + id);
    }
  }

  getIngredients() {
    return this.ingredients.slice();
  }

  updateAmount(ingredientId:string, newAmount:number){
    let ingredientToUpdate = this.getIngredientById(ingredientId);
    ingredientToUpdate.amount = newAmount;
  }
}
