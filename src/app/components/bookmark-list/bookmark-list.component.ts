import { Component, OnInit } from '@angular/core';
import { BookmarkService } from '../../core/bookmark.service';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Bookmark } from '../../models/bookmark.model';
import { FilterByDatePipe } from '../../pipes/filter-by-date.pipe';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldAppearance, MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule } from '@angular/router';
import Fuse  from 'fuse.js';

@Component({
  selector: 'app-bookmark-list',
  standalone: true,
  imports: [CommonModule, FormsModule, MatListModule, FilterByDatePipe, MatIconModule, MatButtonModule, MatInputModule, MatToolbarModule, MatFormFieldModule, RouterModule],
  templateUrl: './bookmark-list.component.html',
})

export class BookmarkListComponent implements OnInit {
  bookmarks: Bookmark[] = [];
  filteredBookmarks: Bookmark[] = [];
  groupedBookmarks: { [key: string]: Bookmark[] } = {};
  searchTerm = '';

  constructor(private bookmarkService: BookmarkService) {}

  ngOnInit(): void {
    this.bookmarkService.getBookmarks().subscribe((bookmarks) => {
      this.bookmarks = bookmarks;
      this.filteredBookmarks = bookmarks; // default list
      this.groupBookmarks();
    });
  }

  onSearch(query: string): void {
    const fuse = new Fuse(this.bookmarks, {
      keys: ['name', 'url'],
      threshold: 0.3,
    });

    if (!query.trim()) {
      this.filteredBookmarks = this.bookmarks;
    } else {
      const result = fuse.search(query);
      this.filteredBookmarks = result.map((res) => res.item);
    }

    this.groupBookmarks();
  }

  handleSearchInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input?.value || '';
    this.onSearch(value);
  }
  

  private groupBookmarks(): void {
    const grouped: { [key: string]: Bookmark[] } = {
      Today: [],
      Yesterday: [],
      Older: [],
    };

    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    for (const bookmark of this.filteredBookmarks) {
      const createdAt = new Date(bookmark.createdAt);
      const createdDate = createdAt.toDateString();

      if (createdDate === today.toDateString()) {
        grouped['Today'].push(bookmark);
      } else if (createdDate === yesterday.toDateString()) {
        grouped['Yesterday'].push(bookmark);
      } else {
        grouped['Older'].push(bookmark);
      }
    }

    this.groupedBookmarks = grouped;
  }
}
