import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from "../recipe.model";
import {RecipesService} from "../../../services/recipes.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.scss'
})
export class RecipeDetailsComponent implements OnInit {
 @Input()recipe:Recipe;
 isLoading=false;

 constructor(private recipeService:RecipesService, private activeRoute:ActivatedRoute, private router:Router) {
 }


  addToShoppingList(){
   if(this.recipe?.ingredients.length>0)
      this.recipeService.addIngredientToShoppingList(this.recipe.ingredients);
  }

  ngOnInit(): void {
    this.isLoading=true;
    this.activeRoute.params.subscribe((params) => {
      let id = params['id'];
      this.recipeService.getRecipeById(id).subscribe(recipe => {
        this.recipe = recipe
        this.isLoading=false;
      });
    })

  }

  onDeleteRecipe() {
   console.log(this.recipe.id);
    this.recipeService.deleteRecipe(this.recipe.id);
    this.recipe=null;
    this.router.navigate(['/recipes']);
  }

}
