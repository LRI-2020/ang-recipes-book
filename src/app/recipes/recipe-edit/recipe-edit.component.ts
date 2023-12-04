import {Component, Input, ViewChild} from '@angular/core';
import {Recipe} from "../recipe.model";
import {RecipesService} from "../../../services/recipes.service";
import {ActivatedRoute} from "@angular/router";
import {isEmpty} from "../../shared/helpers";
import {Ingredient} from "../../shared/ingredient";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.scss'
})
export class RecipeEditComponent {
  originalRecipe: Recipe;
  @ViewChild('new_name') newName:string;
  @ViewChild('new_description') newDescription:string;
  @ViewChild('new_ingredients') newIngredients:Ingredient[];

  constructor(private recipeService: RecipesService, private activeRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params) => {
      let id = +params['id'];
      this.originalRecipe = this.recipeService.getRecipeById(id);
    })

  }

  onSave() {
    if (!isEmpty(this.originalRecipe.name)
      && !isEmpty(this.originalRecipe.description)
      && this.originalRecipe.ingredients.length > 0
      && Number(this.activeRoute.snapshot.params['id']) === this.originalRecipe.id) {
      this.recipeService.updateRecipe(this.originalRecipe.id, this.originalRecipe);
      alert('changes are saved');
    } else {
      alert('there is an error in your data');
      console.log(JSON.stringify(this.originalRecipe));
      console.log(this.activeRoute.snapshot.params['id']);
      console.log(this.originalRecipe.id);
      console.log(this.originalRecipe.name);
      console.log(this.originalRecipe.ingredients.length);
      console.log(this.originalRecipe.description);
      for(let ing of this.originalRecipe.ingredients)
        console.log(ing.name + ' ' + ing.amount);
    }
  }

  onCancel() {

  }

  onBack() {

  }
}
