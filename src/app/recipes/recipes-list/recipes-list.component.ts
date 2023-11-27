import { Component } from '@angular/core';
import {Recipe} from "../recipe.model";

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrl: './recipes-list.component.scss'
})
export class RecipesListComponent {
  recipes:Recipe[]=[
    new Recipe('spaghetti bolognaise 1','recette des spaghetti bolognaise maison', '../../../assets/img/spaghetti_bolognaise.jpg'),
    new Recipe('spaghetti bolognaise 2','recette des spaghetti bolognaise maison', '../../../assets/img/spaghetti_bolognaise.jpg'),
    new Recipe('spaghetti bolognaise 3','recette des spaghetti bolognaise maison', '../../../assets/img/spaghetti_bolognaise.jpg')]
}
