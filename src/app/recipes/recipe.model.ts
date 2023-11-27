export class Recipe {

  public name: string
  public description: string
  public imagePath: string

  constructor(name: string, description: string, image: string) {

    this.name = name
    this.description = description
    this.imagePath = image
  }
}
