import {Ingredient} from "../shared/ingredient";

export class Recipe {
  get ingredients(): Ingredient[] {
    return this._ingredients;
  }

  set ingredients(value: Ingredient[]) {
    this._ingredients = value;
  }
  private _ingredients: Ingredient[];
  get imagePath(): string {
    return this._imagePath;
  }

  set imagePath(value: string) {
    this._imagePath = value;
  }
  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }
  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }
  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  private _name: string
  private _description: string
  private _imagePath: string
  private _id: number;

  constructor(id:number,name: string, description: string, image: string, ingredients:Ingredient[]) {
    this._id=id
    this._name = name
    this._description = description
    this._imagePath = image
    this._ingredients = ingredients
  }
}
