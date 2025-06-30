import { Injectable } from "@angular/core";
import { DEFAULT_THEME } from "../environment";

export enum Theme {
  DARK,
  LIGHT,
  COMPUTER
}

@Injectable({providedIn: "root"})
export class ThemeProvider {
  private theme: Theme = Theme.DARK;

  constructor() {
    const value = localStorage.getItem("theme");

    if (!value) {
      this.theme = DEFAULT_THEME;
    }

    const darkValue = Theme.DARK.toString();
    const lightValue = Theme.LIGHT.toString();
    const computerValue = Theme.COMPUTER.toString();

    switch (value) {
      case darkValue:
        this.theme = Theme.DARK;
        break;

      case lightValue:
        this.theme = Theme.LIGHT;
        break;

      case computerValue:
        this.theme = Theme.COMPUTER;
        break;

      default:
        this.theme = DEFAULT_THEME;
    }

    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (event) => {
      if (this.theme == Theme.COMPUTER) {
        document.documentElement.setAttribute("data-theme", event.matches ? "dark" : "light");
      }
    });
  }

  getThemeString(theme: Theme): "dark" | "light" {
    return theme == Theme.DARK ? "dark" : "light";
  }

  setTheme(theme: Theme): string {
    this.theme = theme;
    let _theme = this.getThemeString(theme);

    if (this.theme == Theme.COMPUTER) {
      const userTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;

      if (userTheme) {
        _theme = userTheme ? "dark" : "light";
      }
    }

    localStorage.setItem("theme", theme.toString());
    document.documentElement.setAttribute("data-theme", _theme);

    return _theme;
  }

  getTheme(): Theme {
    return this.theme;
  }
}
