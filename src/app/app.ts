import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Theme, ThemeProvider } from '../service/Theme';

@Component({
  selector: "root",
  imports: [RouterOutlet],
  templateUrl: "./app.html",
  styleUrl: "./app.css",
})

export class App implements OnInit {
  public themeService = inject(ThemeProvider);
  Theme = Theme;

  ngOnInit(): void {
    this.themeService.setTheme(this.themeService.getTheme());
  }

  changeTheme() {
    switch (this.themeService.getTheme()) {
      case Theme.LIGHT:
        this.themeService.setTheme(Theme.COMPUTER);
        break;

      case Theme.COMPUTER:
        this.themeService.setTheme(Theme.DARK);
        break;

      case Theme.DARK:
        this.themeService.setTheme(Theme.LIGHT);
        break;
    }
  }
}
