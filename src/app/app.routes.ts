import { Routes } from '@angular/router';

import { Home } from '../routes/Home/Home';
import { Deletion } from '../routes/Deletion/Deletion';

export const routes: Routes = [
  {
    path: "",
    component: Home
  },
  {
    path: "delete/:id",
    component: Deletion
  }
];
