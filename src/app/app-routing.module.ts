import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BookmarkListComponent } from './components/bookmark-list/bookmark-list.component';
import { BookmarkCreateComponent } from './components/bookmark-create/bookmark-create.component';
import { BookmarkEditComponent } from './components/bookmark-edit/bookmark-edit.component';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    loadComponent: () =>
      import('./components/bookmark-list/bookmark-list.component').then(m => m.BookmarkListComponent),
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./components/bookmark-create/bookmark-create.component').then(m => m.BookmarkCreateComponent),
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./components/bookmark-edit/bookmark-edit.component').then(m => m.BookmarkEditComponent),
  },
  { path: '**', redirectTo: '' }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
