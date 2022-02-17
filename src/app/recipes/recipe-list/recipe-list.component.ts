import {Component, EventEmitter, Output} from "@angular/core";
import {Recipe} from "../recipe.model";

@Component({
  selector: 'app-recipe-list',
  templateUrl: 'recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})

export class RecipeListComponent {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe("Test Recipe","This is a test","https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2015/11/shakshuka-11.jpg"),
    new Recipe("Another Test Recipe","This is a test","https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2015/11/shakshuka-11.jpg")
  ];

  constructor() {
  }
  ngOninit(){

  }

  onRecipeSelected(r: Recipe) {
    this.recipeWasSelected.emit(r);
  }
}
