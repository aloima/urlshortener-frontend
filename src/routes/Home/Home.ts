import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Router, RouterLink } from "@angular/router";

import { idToString } from "../../app/id";
import { API_URL } from "../../environment";
import { catchError, of } from "rxjs";

@Component({
  templateUrl: "./home.html",
  styleUrl: "./home.css",
  imports: [CommonModule, FormsModule, RouterLink]
})

export class Home {
  site: string = "";

  _url: string = "";
  listable: boolean = false;
  shortened: boolean = false;
  errorMessage: string = "";

  id: number = 1;
  deletionId: number = 2;
  createdAt: number = 0;

  constructor(private http: HttpClient, public router: Router) {
    this.site = window.location.origin;
  }

  get url() {
    return this._url;
  }

  set url(value: string) {
    this._url = value;

    if (this.errorMessage) this.errorMessage = "";
  }

  shortenURL() {
    this.http.post(`${API_URL}/url`, {
      value: this.url,
      listable: this.listable
    }).pipe(catchError(data => of(data.error))).subscribe((value: any) => {
      if (value instanceof Error) {
        this.errorMessage = "API server is unreachable, so could not shorten URL.";
        return;
      }

      if (value.error) {
        this.errorMessage = value.error.replaceAll("'value' in data", "Given input");
        return;
      }

      this.shortened = true;
      this.id = value.id;
      this.deletionId = value.deletionId;
      this.createdAt = value.createdAt;
    });
  }

  idToString(id: number): string {
    return idToString(id);
  }

  reset() {
    this.shortened = false;
    this.url = "";
    this.listable = false;
  }
}
