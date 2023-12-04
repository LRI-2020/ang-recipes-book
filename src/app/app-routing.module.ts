import {RouterModule, Routes} from "@angular/router";
import {RecipesComponent} from "./recipes/recipes.component";
import {ShoppingListComponent} from "./shopping-list/shopping-list.component";
import {NgModule} from "@angular/core";
import {RecipeDetailsComponent} from "./recipes/recipe-details/recipe-details.component";
import {SelectRecipeComponent} from "./recipes/select-recipe/select-recipe.component";
import {RecipeEditComponent} from "./recipes/recipe-edit/recipe-edit.component";

const appRoutes: Routes = [
  {path:"", redirectTo:"/recipes", pathMatch:"full"},
  {path:"recipes", component:RecipesComponent, children:[
      {path:"", component:SelectRecipeComponent},
      {path:":id", component:RecipeDetailsComponent},
      {path:":id/edit", component:RecipeEditComponent},

    ]},
  {path:"shopping", component:ShoppingListComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})


export class AppRoutingModule {
}
