import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { idToString } from "../../app/id";
import { HttpClient } from "@angular/common/http";
import { API_URL } from "../../environment";

@Component({
  templateUrl: "./deletion.html",
  styleUrl: "./deletion.css",
  imports: [CommonModule, RouterModule]
})

export class Deletion {
  private activatedRoute = inject(ActivatedRoute);

  url: string = "";

  constructor(private http: HttpClient) {
    const deletionURL = this.activatedRoute.snapshot.paramMap.get("id") as string;

    this.http.delete(`${API_URL}/url/${deletionURL}`).subscribe((response) => {
      this.url = idToString(parseInt(response as string));
    });
  }
}
