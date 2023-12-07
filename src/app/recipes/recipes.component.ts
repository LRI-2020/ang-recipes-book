import {Component, ViewChild} from '@angular/core';
import {Recipe} from "./recipe.model";
import {RecipesService} from "../../services/recipes.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.scss',
  providers:[]
})
export class RecipesComponent {

}
