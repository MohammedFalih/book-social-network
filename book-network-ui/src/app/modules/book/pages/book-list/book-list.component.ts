import { Component, OnInit } from '@angular/core';
import { PageResponseBookResponse } from 'src/app/services/models';
import { BookService } from 'src/app/services/services';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit {
  bookResponse: PageResponseBookResponse = {};
  page = 0;
  size = 5;
  pages: any = [];
  message: string = '';
  level: 'success' | 'error' = 'success';

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.fetchAllBooks();
  }

  fetchAllBooks() {
    this.bookService
      .findAllBooks({ page: this.page, size: this.size })
      .subscribe({
        next: (books) => {
          this.bookResponse = books;
          this.pages = Array(this.bookResponse.totalPages)
            .fill(0)
            .map((x, i) => i);
        },
      });
  }

  goToFirstPage() {}

  goToLastPage() {}

  goToNextPage() {}

  gotToPage(_t23: any) {}

  goToPreviousPage() {}

  get isLastPage() {
    return this.page === (this.bookResponse.totalPages as number) - 1;
  }

  displayBookDetails($event: any) {
  }
  borrowBook($event: any) {
  }
}
