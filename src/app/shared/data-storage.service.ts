import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {RecipeService} from "../recipes/recipe.service";
import {Recipe} from "../recipes/recipe.model";
import {map, tap} from "rxjs/operators";
import {AuthenticationService} from "../_services/authentication.service";

@Injectable({providedIn: 'root'})
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthenticationService) {

  }

  storeRecipes(){
    let u = localStorage.getItem("currentUser");
    const recipes = this.recipeService.getRecipes();
    this.http.post('http://localhost:8081/recipe-book/insert-recipes?username='+u,recipes)
      .subscribe(response =>{
      console.log(response);
    });
  }

  loadRecipes() {
    let u = localStorage.getItem("currentUser");
    return this.http.get<Recipe[]>('http://localhost:8081/recipe-book/recipes?username='+u)
      .pipe(map(recipes => {
        return recipes.map(recipe =>{
          return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
        });
      }),tap(recipes =>{
        this.recipeService.setRecipes(recipes);
      }))
  }
}
