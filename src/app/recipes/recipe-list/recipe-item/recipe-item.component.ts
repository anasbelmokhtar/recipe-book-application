import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Recipe} from "../../recipe.model";

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  @Output() recipeEvent = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  onClick(recipe: Recipe) {
    this.recipeEvent.emit();
  }
}
