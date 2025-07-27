import { Component } from '@angular/core';
import { Router } from '@angular/router';
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

@Component({
  selector: 'app-bookmark-create',
  standalone: true,
  imports: [CommonModule, FormsModule, MatListModule, FilterByDatePipe, MatIconModule, MatButtonModule, MatInputModule, MatToolbarModule, MatFormFieldModule, RouterModule], 
  templateUrl: './bookmark-create.component.html'
})
export class BookmarkCreateComponent {
  bookmark = {
    name: '',
    url: '',
    createdAt: new Date().toISOString()
  };

  constructor(
    private bookmarkService: BookmarkService,
    private router: Router
  ) {}

  createBookmark() {
    this.bookmarkService.addBookmark(this.bookmark).subscribe(() => {
      this.router.navigate(['/list']); // Redirect to list after create
    });
  }
}
