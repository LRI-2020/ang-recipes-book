import {Ingredient} from "../shared/ingredient";
import {v4 as uuidv4} from "uuid";

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
  get id(): string {
    return this._id;
  }

  private _name: string
  private _description: string
  private _imagePath: string
  private readonly _id: string;

  constructor(name: string, description: string, image: string, ingredients:Ingredient[], id?:string) {
    this._id= id? id : uuidv4();
    this._name = name
    this._description = description
    this._imagePath = image
    this._ingredients = ingredients
  }
}
