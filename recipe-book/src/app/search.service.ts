
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchTextSource = new BehaviorSubject<string>('');
  currentSearchText = this.searchTextSource.asObservable();

  updateSearchText(searchText: string) {
    this.searchTextSource.next(searchText);
  }
}

