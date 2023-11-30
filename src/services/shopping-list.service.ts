import {Ingredient} from "../app/shared/ingredient";
import {EventEmitter} from "@angular/core";

export class ShoppingListService{
  ingredients:Ingredient[]=[];
  onIngredientAdded = new EventEmitter<void>();

  addIngredient(ingredient:Ingredient) {
    console.log('in the add ingredient method of service');
    this.ingredients.push(ingredient);
    this.onIngredientAdded.emit();
    console.log('new list of ingredients : ' + JSON.stringify(this.ingredients));
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
