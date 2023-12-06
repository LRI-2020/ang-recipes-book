import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from "../shared/ingredient";
import {ShoppingListService} from "../../services/shopping-list.service";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.scss',
})
export class ShoppingListComponent implements OnInit, OnDestroy {


  ingredients: Ingredient[] = [];
  changesIngredientSubscription: Subscription
  ingredientInEdition: string

  constructor(private shoppingService: ShoppingListService, private router:Router, private activeRoute: ActivatedRoute) {
    this.ingredients = this.shoppingService.getIngredients();

  }

  ngOnInit(): void {
    this.changesIngredientSubscription = this.shoppingService.onIngredientsChanged.subscribe(() => {
      this.ingredients = this.shoppingService.getIngredients();
    })

    this.activeRoute.queryParams.subscribe((queryP)=>{

      if(queryP['editMode'] === 'false')
        this.ingredientInEdition = null;
    })
  }

  ngOnDestroy(): void {

    this.changesIngredientSubscription.unsubscribe();
  }


  onEditIngredient(id: string) {
    this.shoppingService.onEditingIngredient.next(id);
    this.router.navigate([], {queryParams: {editMode: 'true'}});
    this.ingredientInEdition = id;

  }

  onDeleteIngredient(id: string) {
      this.shoppingService.deleteIngredient(id);
    }

}
