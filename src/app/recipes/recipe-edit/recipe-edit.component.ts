import {Component, ElementRef, Input, ViewChild} from '@angular/core';
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
  @ViewChild('new_name') newName:ElementRef;
  @ViewChild('new_description') newDescription:ElementRef;

  constructor(private recipeService: RecipesService, private activeRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params) => {
      let id = +params['id'];
      this.originalRecipe = this.recipeService.getRecipeById(id);
    })

  }

  onSave() {
    if (!isEmpty(this.newName.nativeElement.value)
      && !isEmpty(this.newDescription.nativeElement.value)
      && Number(this.activeRoute.snapshot.params['id']) === this.originalRecipe.id) {
      this.recipeService.updateRecipe(this.originalRecipe.id, this.newName.nativeElement.value, this.newDescription.nativeElement.value);
      alert('changes are saved');
    } else {
      alert('there is an error in your data');

    }
  }

  onCancel() {

  }

  onBack() {

  }
}
