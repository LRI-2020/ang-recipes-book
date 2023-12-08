import {Ingredient} from "./ingredient";

export function isEmpty(value:any){
  return (value=== null || value === undefined || (typeof value === 'string' && value.trim().length === 0));
}

export function recipeToJs(name: string, description: string, img: string, ingredients: Ingredient[]) {
  let ingredientsToJs = [];
  ingredients.forEach(ing => ingredientsToJs.push(
    {
      id: ing.id,
      name: ing.name,
      amount: ing.amount
    })
  )

  return {
    name: name,
    description: description,
    imagePath: img,
    ingredients: ingredientsToJs
  }
}
