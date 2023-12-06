import {Component} from '@angular/core';
import {Recipe} from "../recipe.model";
import {RecipesService} from "../../../services/recipes.service";
import {ActivatedRoute} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {v4 as uuidv4} from "uuid";

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
        let id = +params['id'];
        this.originalRecipe = this.recipeService.getRecipeById(id);
      }
    });
    this.generateForm();

  }

  onSave() {
    // if (!isEmpty(this.newName.nativeElement.value)
    //   && !isEmpty(this.newDescription.nativeElement.value)
    //   && Number(this.activeRoute.snapshot.params['id']) === this.originalRecipe.id) {
    //   this.recipeService.updateRecipe(this.originalRecipe.id, this.newName.nativeElement.value, this.newDescription.nativeElement.value);
    //   alert('changes are saved');
    // } else {
    //   alert('there is an error in your data');
    //
    // }
  }

  onCancel() {

  }

  onBack() {

  }

  onAddIngredient(){
    const formGroup = new FormGroup({
        'ingredientName': new FormControl(null),
        'ingredientAmount': new FormControl(null)
      });
    (<FormGroup>this.editRecipeForm.get('ingredients')).addControl(uuidv4(),formGroup);
  }

  private generateForm() {

    let ingredients:FormGroup<{}> = this.generateIngredients();
    this.editRecipeForm = new FormGroup({
      'recipeId': new FormControl(this.editMode ? this.originalRecipe.id : ''),
      'recipeName': new FormControl(this.editMode ? this.originalRecipe.name : ''),
      'recipeDescription': new FormControl(this.editMode ? this.originalRecipe.description : ''),
      'ingredients': ingredients
    })
  }

  private generateIngredients() {
    let ingredients = new FormGroup({});

    if (this.editMode) {
      this.originalRecipe.ingredients.forEach(ing => {

        let ingredientForm = new FormGroup({
          'ingredientName': new FormControl(ing.name),
          'ingredientAmount': new FormControl(ing.amount)
        })
        ingredients.addControl(ing.id, ingredientForm);
      });
    }
    return ingredients;
  }

  getIngredientForms() {
    return ((<FormGroup>this.editRecipeForm.get('ingredients')).controls);
  }
}
