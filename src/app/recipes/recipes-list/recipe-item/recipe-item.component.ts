import {Component, Input} from '@angular/core';
import {Recipe} from "../../recipe.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.scss'
})
export class RecipeItemComponent {
  @Input('recipeItem') recipe: Recipe;

  constructor(private router:Router) {
  }
  onSelected() {
    this.router.navigate(['/recipes',this.recipe.id.toString()]);
  }

}
