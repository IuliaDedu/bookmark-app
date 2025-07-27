import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BookmarkEditComponent } from './components/bookmark-edit/bookmark-edit.component';
import { BookmarkListComponent } from './components/bookmark-list/bookmark-list.component';
import { bookmarkReducer } from './store/reducers/bookmark.reducer';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    MatIconModule,
    MatListModule,
    FormsModule, 
    MatInputModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatButtonModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    BookmarkListComponent,
    StoreModule.forRoot({bookmarks: bookmarkReducer})
  ],
  bootstrap: [AppComponent]
})
export class AppModule { } 
