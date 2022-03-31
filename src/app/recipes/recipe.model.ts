import {Ingredient} from "../shared/ingredient.model";

export class Recipe {
  public recipeName: string;
  public recipeDescription: string;
  public imagePath: string;
  public ingredients: Ingredient[];

  constructor(name: string, desc: string, imagePath: string, ingredients: Ingredient[]) {
    this.recipeName = name;
    this.recipeDescription = desc;
    this.imagePath = imagePath;
    this.ingredients = ingredients;
  }
}
