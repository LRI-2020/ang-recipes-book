import {Component, Input} from '@angular/core';
import {Recipe} from "../recipe.model";
import {ShoppingListService} from "../../../services/shopping-list.service";
import {RecipesService} from "../../../services/recipes.service";

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.scss'
})
export class RecipeDetailsComponent {
 @Input()recipe:Recipe;

 constructor(private recipeService:RecipesService) {
 }

  addToShoppingList(){
   if(this.recipe?.ingredients.length>0)
      this.recipeService.addIngredientToShoppingList(this.recipe.ingredients);
  }
}
