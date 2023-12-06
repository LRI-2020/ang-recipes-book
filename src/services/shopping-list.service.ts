import {Ingredient} from "../app/shared/ingredient";
import {Subject} from "rxjs";

export class ShoppingListService{
  ingredients:Ingredient[]=[];
  onIngredientsChanged = new Subject<void>();
  onEditingIngredient = new Subject<string>();
  onStopEditingIngredient = new Subject<string>();

  addIngredient(ingredient:Ingredient) {
    this.ingredients.push(ingredient);
    this.onIngredientsChanged.next();
  }

  addIngredients(ingredients:Ingredient[]){
    this.ingredients.push(...ingredients);
    this.onIngredientsChanged.next();
  }

  constructor() {
this.addIngredients([new Ingredient('pomme',15),
new Ingredient('poire',5)])
  }

  getIngredientById(id:string){
    try{
      return this.ingredients.slice().find(i => i.id===id);
    }
    catch(e){
      console.log('no ingredient found for id : ' + id);
    }
  }

  getIngredients() {
    return this.ingredients.slice();
  }

  updateIngredient(ingredientId:string, ingredientUpdated:Ingredient){
    let ingredientToUpdate = this.ingredients.find(i => i.id === ingredientId);
    ingredientToUpdate.name = ingredientUpdated.name;
    ingredientToUpdate.amount = ingredientUpdated.amount;
    this.onIngredientsChanged.next();
  }

  deleteAll() {
    this.ingredients = [];
    this.onIngredientsChanged.next();
  }

  deleteIngredient(id: string) {
      let index = this.ingredients.indexOf(this.ingredients.find(i => i.id===id));
      this.ingredients.splice(index,1);
      this.onIngredientsChanged.next();

  }
}
