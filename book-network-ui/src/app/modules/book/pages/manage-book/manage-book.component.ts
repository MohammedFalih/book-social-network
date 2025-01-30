import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookRequest } from 'src/app/services/models';
import { BookService } from 'src/app/services/services';

@Component({
  selector: 'app-manage-book',
  templateUrl: './manage-book.component.html',
  styleUrls: ['./manage-book.component.scss'],
})
export class ManageBookComponent implements OnInit {
  errorMsg: Array<String> = [];
  selectedBookCover: any;
  selectedPicture: string | undefined;
  bookRequest: BookRequest = {
    authorName: '',
    isbn: '',
    synopsis: '',
    title: '',
  };

  constructor(
    private bookService: BookService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const bookId = this.activatedRoute.snapshot.params['bookId'];
    if (bookId) {
      this.bookService.findById({ 'book-id': bookId }).subscribe({
        next: (book) => {
          this.bookRequest = {
            id: book.id,
            authorName: book.authorName as string,
            title: book.title as string,
            isbn: book.isbn as string,
            synopsis: book.synopsis as string,
            shareable: book.shareable,
          };
          if (book.cover) {
            this.selectedPicture = 'data:image/jpg;base64, ' + book.cover;
          }
        },
      });
    }
  }

  saveBook() {
    this.bookService
      .saveBook({
        body: this.bookRequest,
      })
      .subscribe({
        next: (bookId) => {
          this.bookService
            .uploadBookCoverPicture({
              'book-id': bookId,
              body: {
                file: this.selectedBookCover,
              },
            })
            .subscribe({
              next: () => {
                this.router.navigate(['/books/my-books']);
              },
            });
        },
        error: (err) => {
          console.log(err.error);
          this.errorMsg = err.error.error;
        },
      });
  }

  onFileSelected(event: any) {
    this.selectedBookCover = event.target.files[0];
    if (this.selectedBookCover) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedPicture = reader.result as string;
      };
      reader.readAsDataURL(this.selectedBookCover);
    }
  }
}
