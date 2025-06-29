import { HttpClient } from "@angular/common/http";
import { Component, NgZone } from "@angular/core";
import { API_URL } from "../../environment";
import { CommonModule, Location } from "@angular/common";
import { RouterModule } from "@angular/router";
import { catchError, of } from "rxjs";

@Component({
  template: `
    <div *ngIf="errorMessage; then error else redirecting"></div>

    <ng-template #error>
      <a class="button" routerLink="/">Go back</a>
      <p class="error">{{ errorMessage }}</p>
    </ng-template>

    <ng-template #redirecting>
      <p>Redirecting...</p>
    </ng-template>
  `,
  imports: [CommonModule, RouterModule]
})

export class Go {
  url: string = "";
  errorMessage: string = "";

  constructor(private http: HttpClient, private location: Location) {
    this.url = this.location.path().slice(1);

    this.http.get(`${API_URL}/url/go/${this.url}`, { responseType: "text" }).pipe(catchError(data => {
      return of(typeof data.error == "string" ? JSON.parse(data.error) : null);
    })).subscribe((response) => {
        if (!response) {
          this.errorMessage = "API server is unreachable, so could not retrieve URL.";
          return;
        } else if (response.error) {
          this.errorMessage = response.error;
          return;
        }

        window.location.href = response;
    });
  }
}
