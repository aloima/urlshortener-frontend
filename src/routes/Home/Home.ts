import { Component, input, Input, OnChanges, SimpleChanges } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Router, RouterLink } from "@angular/router";

import { idToString } from "../../app/id";
import { API_URL } from "../../environment";

@Component({
  templateUrl: "./home.html",
  styleUrl: "./home.css",
  imports: [CommonModule, FormsModule, RouterLink]
})

export class Home {
  site: string = "";

  url: string = "";
  listable: boolean = false;
  shortened: boolean = false;

  id: number = 1;
  deletionId: number = 2;
  createdAt: number = 0;

  constructor(private http: HttpClient, public router: Router) {
    this.site = window.location.origin;
  }

  shortenURL() {
    this.http.post(`${API_URL}/url`, {
      value: this.url,
      listable: this.listable
    }).subscribe((value: any) => {
      this.shortened = true;
      this.id = value.id;
      this.deletionId = value.deletionId;
      this.createdAt = value.createdAt;
    });
  }

  idToString(id: number): string {
    return idToString(id);
  }
}
