import { ChangeDetectorRef, Component, NgZone } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { HttpClient } from "@angular/common/http";

import { API_URL, URL_COUNT_PER_PAGE } from "../../environment";
import { BehaviorSubject, catchError, of } from "rxjs";
import { idToString } from "../../app/id";

@Component({
  templateUrl: "./list.html",
  styleUrl: "./list.css",
  imports: [CommonModule, RouterLink]
})

export class List {
  site: string;
  errorMessage: string = "";

  page: number = 1;
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
    return Math.ceil(this.listableCount / URL_COUNT_PER_PAGE);
  }

  loadPage(page: number) {
    this.loading$.next(true);

    const start = (page - 1) * URL_COUNT_PER_PAGE;
    const end = page * URL_COUNT_PER_PAGE;

    this.http.get(`${API_URL}/url/list?start=${start}&end=${end}`).pipe(catchError(() => {
      return of(null);
    })).subscribe((res) => {
      this.zone.run(() => {
        if (!res) {
          this.errorMessage = "API server is unreachable, so could not list URLs.";
          return;
        }

        const response = res as ListResponse;

        this.listableCount = response.listableCount;
        this.data = response.data;
        this.loading$.next(false);
      });
    });
  }

  nextPage() {
    this.page += 1;
    this.loadPage(this.page);
  }

  prevPage() {
    this.page -= 1;
    this.loadPage(this.page);
  }

  takeNormalizedDate(dateString: Date, full: boolean): string {
    const date = new Date(dateString);
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    if (full) {
      return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    } else {
      return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
    }
  }
}
