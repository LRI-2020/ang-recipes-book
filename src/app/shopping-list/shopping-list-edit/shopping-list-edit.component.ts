import {Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {isEmpty} from "../../shared/helpers";
import {Ingredient} from "../../shared/ingredient";

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrl: './shopping-list-edit.component.scss'
})
export class ShoppingListEditComponent {
@ViewChild('ingredientName') newIngredientName:ElementRef;
@ViewChild('ingredientAmount') newIngredientAmount:ElementRef;
@Output() onAddIngredient= new EventEmitter<Ingredient>();
  emitNewIngredient() {
    if(!isEmpty(this.newIngredientAmount) && !isEmpty(this.newIngredientName))
    {
      const newIngredient = new Ingredient(this.newIngredientName.nativeElement.value,this.newIngredientAmount.nativeElement.value);
      this.onAddIngredient.emit(newIngredient);
    }
  }
}
