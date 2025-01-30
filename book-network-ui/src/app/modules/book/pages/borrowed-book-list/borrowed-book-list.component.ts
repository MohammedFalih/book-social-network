import { Component, OnInit } from '@angular/core';
import {
  BookResponse,
  FeedbackRequest,
  PageResponseBorrowedBookResponse,
} from 'src/app/services/models';
import { BookService, FeedbackService } from 'src/app/services/services';

@Component({
  selector: 'app-borrowed-book-list',
  templateUrl: './borrowed-book-list.component.html',
  styleUrls: ['./borrowed-book-list.component.scss'],
})
export class BorrowedBookListComponent implements OnInit {
  size = 5;
  pages: any[] = [];
  page = 0;
  selectedBook: BookResponse | undefined = undefined;
  feedbackRequest: FeedbackRequest = { bookId: 0, comment: '', note: 0 };
  borrowedBooks: PageResponseBorrowedBookResponse = {};

  constructor(
    private bookService: BookService,
    private feedbackService: FeedbackService
  ) {}

  ngOnInit(): void {
    this.finalAllBorrowedBooks();
  }

  finalAllBorrowedBooks() {
    this.bookService
      .findAllBorrowedBooks({
        page: this.page,
        size: this.size,
      })
      .subscribe({
        next: (response) => {
          this.borrowedBooks = response;
          this.pages = Array(this.borrowedBooks.totalPages)
            .fill(0)
            .map((x, i) => i);
        },
      });
  }

  returnBook(withFeedback: boolean) {
    this.bookService
      .returnBorrowedBook({
        'book-id': this.selectedBook?.id as number,
      })
      .subscribe({
        next: () => {
          if (withFeedback) {
            this.giveFeedback();
          }
          this.selectedBook = undefined;
          this.finalAllBorrowedBooks();
        },
      });
  }

  giveFeedback() {
    this.feedbackService
      .save({
        body: this.feedbackRequest,
      })
      .subscribe();
  }

  returnBorrowedBook(book: BookResponse) {
    this.selectedBook = book;
    this.feedbackRequest.bookId = book.id as number;
  }

  gotToPage(page: number) {
    this.page = page;
    this.finalAllBorrowedBooks();
  }

  goToFirstPage() {
    this.page = 0;
    this.finalAllBorrowedBooks();
  }

  goToPreviousPage() {
    this.page--;
    this.finalAllBorrowedBooks();
  }

  goToLastPage() {
    this.page = (this.borrowedBooks.totalPages as number) - 1;
    this.finalAllBorrowedBooks();
  }

  goToNextPage() {
    this.page++;
    this.finalAllBorrowedBooks();
  }

  get isLastPage() {
    return this.page === (this.borrowedBooks.totalPages as number) - 1;
  }
}
