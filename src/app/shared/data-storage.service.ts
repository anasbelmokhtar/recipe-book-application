import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {RecipeService} from "../recipes/recipe.service";
import {Recipe} from "../recipes/recipe.model";
import {map} from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {

  }

  storeRecipes(){
    const recipes = this.recipeService.getRecipes();
    this.http.post('http://localhost:8080/recipe-book/insert-recipes',recipes)
      .subscribe(response =>{
      console.log(response);
    });
  }

  loadRecipes() {
    this.http.get<Recipe[]>('http://localhost:8080/recipe-book/recipes')
      .pipe(map(recipes => {
        return recipes.map(recipe =>{
          return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
        });
      }))
      .subscribe(recipes =>{
      console.log(recipes);
      this.recipeService.setRecipes(recipes);
    })
  }
}
