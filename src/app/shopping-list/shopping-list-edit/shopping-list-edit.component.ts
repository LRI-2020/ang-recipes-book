import {Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {isEmpty} from "../../shared/helpers";
import {Ingredient} from "../../shared/ingredient";
import {ShoppingListService} from "../../../services/shopping-list.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrl: './shopping-list-edit.component.scss'
})
export class ShoppingListEditComponent {

  @ViewChild('addIngredientForm') addIngredientForm: NgForm

  constructor(private shoppingService: ShoppingListService) {
  }
  addIngredient() {
    let name = this.addIngredientForm.value.ingredientName;
    let amount = this.addIngredientForm.value.amount;
    let ingredient = new Ingredient(name, amount);
    this.shoppingService.addIngredient(ingredient);
  }
}
