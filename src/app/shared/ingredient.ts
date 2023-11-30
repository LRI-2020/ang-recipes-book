import {v4 as uuidv4} from "uuid";
export class Ingredient {
  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }
  get amount(): number {
    return this._amount;
  }

  set amount(value: number) {
    this._amount = value;
  }
  get id(): string {
    return this._id;
  }

  private _name:string
  private _amount:number
  private readonly _id: string;

  constructor(name:string, amount:number) {
    this._name=name;
    this._id=uuidv4();
    this._amount = amount;
  }

}
