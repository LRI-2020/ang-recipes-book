import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredient";
import {ShoppingListService} from "../../../services/shopping-list.service";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrl: './shopping-list-edit.component.scss'
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {

  @ViewChild('addIngredientForm') addIngredientForm: NgForm
  ingredientInEdition: Ingredient
  onEditingSubscription: Subscription

  constructor(private shoppingService: ShoppingListService, private router: Router, private activeRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.onEditingSubscription = this.shoppingService.onEditingIngredient.subscribe((id) => {
      this.router.navigate([''], {queryParams: {editMode: 'true'}});
      this.ingredientInEdition = this.shoppingService.getIngredientById(id);
      this.addIngredientForm.setValue({
        'ingredientName': this.ingredientInEdition.name,
        'amount': this.ingredientInEdition.amount
      });
    })

    this.shoppingService.onIngredientsChanged.subscribe(()=>{
      this.resetFormState();
    })
  }

  isEditMode(){
    return this.activeRoute.snapshot.queryParams['editMode']==='true';
  }

  addIngredient() {
    if (!this.isEditMode()) {
      this.addNewIngredient();
    } else {
      this.editIngredient();
    }

  }
  addNewIngredient() {
    let name = this.addIngredientForm.value.ingredientName;
    let amount = this.addIngredientForm.value.amount;
    let ingredient = new Ingredient(name, amount);
    this.shoppingService.addIngredient(ingredient);
    this.resetFormState()
  }

  editIngredient() {

    this.ingredientInEdition.name = this.addIngredientForm.value.ingredientName;
    this.ingredientInEdition.amount = this.addIngredientForm.value.amount;

    this.shoppingService.updateIngredient(this.ingredientInEdition.id, this.ingredientInEdition);

    this.resetFormState();
    this.shoppingService.onStopEditingIngredient.next();

  }

  onClear() {
    this.resetFormState();

    this.shoppingService.onStopEditingIngredient.next();
    this.addIngredientForm.reset();
  }

  onDeleteAll() {
    this.shoppingService.deleteAll();
    this.resetFormState();
  }

  resetFormState() {
    this.router.navigate([], {queryParams: {editMode: 'false'}});
    this.addIngredientForm.reset();
    this.ingredientInEdition = null;
  }

  ngOnDestroy(): void {
    this.onEditingSubscription.unsubscribe();
  }
}
