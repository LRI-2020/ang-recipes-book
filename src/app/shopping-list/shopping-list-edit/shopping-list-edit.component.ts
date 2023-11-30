import {Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {isEmpty} from "../../shared/helpers";
import {Ingredient} from "../../shared/ingredient";
import {ShoppingListService} from "../../../services/shopping-list.service";

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrl: './shopping-list-edit.component.scss'
})
export class ShoppingListEditComponent {
@ViewChild('ingredientName') newIngredientName:ElementRef;
@ViewChild('ingredientAmount') newIngredientAmount:ElementRef;

constructor(private shoppingService:ShoppingListService) {
}
  addNewIngredient() {
    if(!isEmpty(this.newIngredientAmount) && !isEmpty(this.newIngredientName))
    {
      console.log('inputs ok to add new ingredient')
      this.shoppingService.addIngredient(this.newIngredientName.nativeElement.value,this.newIngredientAmount.nativeElement.value);
    }
  }
}
