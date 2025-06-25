import { ChangeDetectorRef, Component, NgZone } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { HttpClient } from "@angular/common/http";

import { API_URL, URL_COUNT_PER_PAGE } from "../../environment";
import { BehaviorSubject } from "rxjs";
import { idToString } from "../../app/id";

@Component({
  templateUrl: "./list.html",
  styleUrl: "./list.css",
  imports: [CommonModule, RouterModule, ]
})

export class List {
  site: string;

  listableCount: number = 0;
  data: URLEntry[] = [];
  loading$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef, private zone: NgZone) {
    this.site = window.location.origin;
    this.listableCount = 1;
    this.loadPage(1);
  }

  idToString(value: number) {
    return idToString(value);
  }

  calculatePageCount() {
    return (this.listableCount / URL_COUNT_PER_PAGE);
  }

  loadPage(page: number) {
    this.loading$.next(true);

    this.http.get(`${API_URL}/url/list?start=${(page - 1) * URL_COUNT_PER_PAGE}&end=${page * URL_COUNT_PER_PAGE}`).subscribe((res) => {
      const response = res as ListResponse;

      this.zone.run(() => {
        this.listableCount = response.listableCount;
        this.data = response.data;
        this.loading$.next(false);
      });
    });
  }
}
