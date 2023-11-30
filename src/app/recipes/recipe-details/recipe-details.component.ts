import {Component, Input} from '@angular/core';
import {Recipe} from "../recipe.model";
import {ShoppingListService} from "../../../services/shopping-list.service";

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.scss'
})
export class RecipeDetailsComponent {
 @Input()recipe:Recipe;

 constructor(private shoppingService:ShoppingListService) {
 }
  addToShoppingList(){
    for (let ing of this.recipe.ingredients){
      this.shoppingService.addIngredient(ing);
    }
  }
}
