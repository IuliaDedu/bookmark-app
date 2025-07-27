import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BookmarkService } from '../../core/bookmark.service';
import { loadBookmarks, loadBookmarksSuccess, loadBookmarksFailure } from '../actions/bookmark.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class BookmarkEffects {
  constructor(private actions$: Actions, private bookmarkService: BookmarkService) {}

  loadBookmarks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadBookmarks),
      mergeMap(() =>
        this.bookmarkService.getBookmarks().pipe(
          map(bookmarks => loadBookmarksSuccess({ bookmarks })),
          catchError(error => of(loadBookmarksFailure({ error })))
        )
      )
    )
  );
}
