import {Component} from '@angular/core';
import {Recipe} from "../recipe.model";
import {RecipesService} from "../../../services/recipes.service";
import {ActivatedRoute} from "@angular/router";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {v4 as uuidv4} from "uuid";
import {Ingredient} from "../../shared/ingredient";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.scss'
})
export class RecipeEditComponent {
  editMode = false;
  originalRecipe: Recipe = null;

  editRecipeForm: FormGroup;

  constructor(private recipeService: RecipesService, private activeRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params) => {
      this.editMode = params['id'] != null;
      if (this.editMode) {
        let id = params['id'];
        this.originalRecipe = this.recipeService.getRecipeById(id);
      }
    });
    this.generateForm();
  }

  onSave() {
    if (this.editRecipeForm.valid) {
      let newName = this.editRecipeForm.get('recipeName').value;
      let newDescription = this.editRecipeForm.get('recipeDescription').value;
      let newIngredients = this.editRecipeForm.get('ingredients').value;
      if (this.editMode) {

        this.updateRecipe(newName, newDescription, newIngredients);

      }

      else{

      }
    }

  }

  onCancel() {

  }

  onBack() {

  }

  onDeleteIngredient(keyForm: number) {
    (<FormArray>this.editRecipeForm.get('ingredients')).removeAt(keyForm);
  }

  onAddIngredient() {
    const formGroup = new FormGroup({
      'ingredientName': new FormControl(null, [Validators.required]),
      'ingredientAmount': new FormControl(null, [Validators.required])
    });
    (<FormArray>this.editRecipeForm.get('ingredients')).push(formGroup);
  }

  private generateForm() {

    let ingredients= this.generateIngredients();
    this.editRecipeForm = new FormGroup({
      'recipeId': new FormControl(this.editMode ? this.originalRecipe.id.toString() : ''),
      'recipeName': new FormControl(this.editMode ? this.originalRecipe.name : ''),
      'recipeDescription': new FormControl(this.editMode ? this.originalRecipe.description : ''),
      'ingredients': ingredients
    })
  }

  private generateIngredients() {
    let ingredients = new FormArray([]);

    if (this.editMode) {
      this.originalRecipe.ingredients.forEach(ing => {

        let ingredientForm = new FormGroup({
          'ingredientName': new FormControl(ing.name),
          'ingredientAmount': new FormControl(ing.amount)
        })
        ingredients.push(ingredientForm);
      });
    }
    return ingredients;
  }

  getIngredientControls() {

    return  (<FormArray>this.editRecipeForm.get('ingredients')).controls;
  }

  private updateRecipe(name: string, description: string, ingredients: any[]) {
    let newRecipe: Recipe = new Recipe(name,description,this.originalRecipe.imagePath, []);
    ingredients.forEach(newIng => {
      newRecipe.ingredients.push(new Ingredient(newIng.ingredientName, newIng.ingredientAmount))
    })    ;
    this.recipeService.updateRecipe(this.originalRecipe.id,newRecipe);

  }

}
