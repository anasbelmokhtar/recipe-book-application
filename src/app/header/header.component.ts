import {Component, EventEmitter, Output} from "@angular/core";
import {DataStorageService} from "../shared/data-storage.service";
import {AuthenticationService} from "../_services/authentication.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector:'app-header',
  templateUrl: './header.component.html'
})

export class HeaderComponent {

  constructor(private dataStorageService: DataStorageService, private authService: AuthenticationService, private router: Router, private route: ActivatedRoute,) {
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.loadRecipes().subscribe();
  }
  onLogout() {
    this.authService.logout();
    this.router.navigate(['login'], {relativeTo: this.route});
  }
}
