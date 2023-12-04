import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from "../shared/ingredient";
import {ShoppingListService} from "../../services/shopping-list.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.scss',
})
export class ShoppingListComponent implements OnInit, OnDestroy{


ingredients:Ingredient[]=[];
changesIngSubscription:Subscription

constructor(private shoppingService : ShoppingListService) {

}
  ngOnInit(): void {
    this.shoppingService.onIngredientsChanged.subscribe(()=>{
      this.ingredients = this.shoppingService.getIngredients();
    })  }

  ngOnDestroy(): void {

  this.changesIngSubscription.unsubscribe();
  }


}
