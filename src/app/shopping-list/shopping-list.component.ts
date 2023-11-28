import {Component, Input} from '@angular/core';
import {Ingredient} from "../shared/ingredient";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.scss'
})
export class ShoppingListComponent {

ingredients:Ingredient[]=[
  new Ingredient('apple',5),
  new Ingredient('banana',2),
  new Ingredient('peer',4),
];

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }
}
