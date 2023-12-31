import {Component} from '@angular/core';
import {Recipe} from "../recipe.model";
import {RecipesService} from "../../../services/recipes.service";
import {ActivatedRoute, Router} from "@angular/router";
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
  namePlaceHolder = 'name';
  amountPlaceHolder = 'amount';
  isLoading=false;

  constructor(private recipeService: RecipesService, private activeRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params) => {
      this.editMode = params['id'] != null;
      if (this.editMode) {
        this.isLoading=true;
        let id = params['id'];
        this.recipeService.getRecipeById(id).subscribe(recipeData => {
          this.originalRecipe = recipeData;
          this.generateForm();
          this.isLoading = false;
        });
      }
      else{
        this.generateForm();
      }

    });
  }

  onSave() {
    if (this.editRecipeForm.valid) {
      let newName = this.editRecipeForm.get('recipeName').value;
      let newDescription = this.editRecipeForm.get('recipeDescription').value;
      let newImagePath = this.editRecipeForm.get('recipeImage').value;
      let newIngredients = this.toIngredients(this.editRecipeForm.get('ingredients').value);
      if (this.editMode) {
        this.updateRecipe(this.originalRecipe.id,newName,newDescription,newImagePath,newIngredients);
      } else {
        this.recipeService.storeRecipe(newName,newDescription,newImagePath,newIngredients);
        this.generateForm();
      }
    }

    else{
      this.editRecipeForm.markAllAsTouched();
    }

  }

  onCancel() {
    let params = this.activeRoute.snapshot.params;
    this.editMode = params['id'] != null;
    if (this.editMode) {
      this.isLoading=true;
      let id = params['id'];
      this.recipeService.getRecipeById(id).subscribe(recipe => {
        this.originalRecipe = recipe;
        this.generateForm();
        this.isLoading = false;
      });
    }
    this.generateForm();
  }

  onBack() {
    if (this.editMode) {
      this.router.navigate(['/recipes', this.originalRecipe.id]);
    } else {
      this.router.navigate(['/recipes']);

    }
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

    let ingredients = this.generateIngredientsForms();
    this.editRecipeForm = new FormGroup({
      'recipeId': new FormControl(this.editMode ? this.originalRecipe.id.toString() : ''),
      'recipeName': new FormControl(this.editMode ? this.originalRecipe.name : '', Validators.required),
      'recipeDescription': new FormControl(this.editMode ? this.originalRecipe.description : '', Validators.required),
      'recipeImage': new FormControl(this.editMode ? this.originalRecipe.imagePath : '', Validators.required),
      'ingredients': ingredients
    })
  }

  private generateIngredientsForms() {
    let ingredients = new FormArray([], Validators.required);

    if (this.editMode) {
      this.originalRecipe.ingredients.forEach(ing => {

        let ingredientForm = new FormGroup({
          'ingredientName': new FormControl(ing.name, Validators.required),
          'ingredientAmount': new FormControl(ing.amount, Validators.required)
        })
        ingredients.push(ingredientForm);
      });
    }
    return ingredients;
  }

  getIngredientControls() {

    return (<FormArray>this.editRecipeForm.get('ingredients')).controls;
  }

  private updateRecipe(id: string, name: string, description: string, newImage:string,newIngredients: Ingredient[]) {
    this.recipeService.updateRecipe(this.originalRecipe.id, name,description,newImage,newIngredients);
  }

  private toIngredients(value: any[]) {
    let results: Ingredient[] = [];
    value.forEach(v => {
      results.push(new Ingredient(v.ingredientName, v.ingredientAmount))
    });

    return results;
  }

}
