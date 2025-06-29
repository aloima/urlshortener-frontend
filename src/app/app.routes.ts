import { Routes } from '@angular/router';

import { Home } from '../routes/Home/Home';
import { Deletion } from '../routes/Deletion/Deletion';
import { List } from '../routes/List/List';
import { Go } from '../routes/Go/Go';

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
