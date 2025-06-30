import { Routes } from '@angular/router';

import { Home } from '../route/Home/Home';
import { Deletion } from '../route/Deletion/Deletion';
import { List } from '../route/List/List';
import { Go } from '../route/Go/Go';

export const routes: Routes = [
  {
    path: "",
    component: Home
  },
  {
    path: "delete/:id",
    component: Deletion
  },
  {
    path: "list",
    component: List
  },
  {
    path: ":id",
    component: Go
  }
];
