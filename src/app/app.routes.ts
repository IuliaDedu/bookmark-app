// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { BookmarkListComponent } from './components/bookmark-list/bookmark-list.component';

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    component: BookmarkListComponent
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./components/bookmark-create/bookmark-create.component').then(m => m.BookmarkCreateComponent)
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./components/bookmark-edit/bookmark-edit.component').then(m => m.BookmarkEditComponent)
  }
];