import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookmarkService } from '../../core/bookmark.service';
import { Bookmark } from '../../models/bookmark.model';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
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
  selector: 'app-bookmark-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, MatListModule, FilterByDatePipe, MatIconModule, MatButtonModule, MatInputModule, MatToolbarModule, MatFormFieldModule, RouterModule], 
  templateUrl: './bookmark-edit.component.html',
})
export class BookmarkEditComponent implements OnInit {
  id: string ='';
  bookmark!: Bookmark;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookmarkService: BookmarkService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if(id){
      this.bookmarkService.getBookmark(id).subscribe(b => this.bookmark = b);
    }
  }

  onSubmit() {
    if (this.bookmark) {
      this.bookmarkService.updateBookmark(this.bookmark.id, this.bookmark).subscribe(() => {
        this.router.navigate(['/list']);
      });
    }
  }
}
