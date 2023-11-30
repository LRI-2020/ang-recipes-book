import {Component, Input, OnInit} from '@angular/core';
import {Ingredient} from "../shared/ingredient";
import {ShoppingListService} from "../../services/shopping-list.service";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.scss',
})
export class ShoppingListComponent implements OnInit{


ingredients:Ingredient[]=[];

constructor(private shoppingService : ShoppingListService) {
  this.shoppingService.onIngredientsChanged.subscribe(()=>{
    this.ingredients = this.shoppingService.getIngredients();

  })
}
  ngOnInit(): void {
   this.ingredients = this.shoppingService.getIngredients();
  }


}
