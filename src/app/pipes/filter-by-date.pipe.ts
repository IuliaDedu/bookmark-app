import { Pipe, PipeTransform } from '@angular/core';
import { Bookmark } from '../models/bookmark.model';

@Pipe({
  name: 'filterByDate', standalone: true
})
export class FilterByDatePipe implements PipeTransform {
  transform(bookmarks: Bookmark[], group: string, searchTerm: string = ''): Bookmark[] {
    if (!bookmarks) return [];

    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    return bookmarks.filter((bookmark) => {
      const createdAt = new Date(bookmark.createdAt);
      const createdAtStr = createdAt.toDateString();
      const todayStr = today.toDateString();
      const yesterdayStr = yesterday.toDateString();

      let matchesGroup = false;
      if (group === 'Today') {
        matchesGroup = createdAtStr === todayStr;
      } else if (group === 'Yesterday') {
        matchesGroup = createdAtStr === yesterdayStr;
      } else if (group === 'Older') {
        matchesGroup = createdAtStr !== todayStr && createdAtStr !== yesterdayStr;
      }

      const matchesSearch = bookmark.name.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesGroup && matchesSearch;
    });
  }
}
