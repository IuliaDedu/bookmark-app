import { createReducer, on } from '@ngrx/store';
import { loadBookmarksSuccess } from '../actions/bookmark.actions';
import { Bookmark } from '../../models/bookmark.model';

export interface State {
  bookmarks: Bookmark[];
}

export const initialState: State = {
  bookmarks: []
};

export const bookmarkReducer = createReducer(
  initialState,
  on(loadBookmarksSuccess, (state, { bookmarks }) => ({ ...state, bookmarks }))
);

export const selectAllBookmarks = (state: State) => state.bookmarks;
