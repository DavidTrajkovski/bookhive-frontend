import {Component} from '@angular/core';
import {BookDto} from "../../core/interface/book/book-dto";
import {Book} from "../../core/interface/book";
import {BookService} from "../../core/service/book/book.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RegisterRequest} from "../../core/interface/authorization/register-request";
import {ActivatedRoute} from "@angular/router";
import {AuthorService} from "../../core/service/author/author.service";
import {BookAuthorInfoDto} from "../../core/interface/author/book-author-info-dto";

@Component({
  selector: 'app-books-add',
  templateUrl: './books-add.component.html',
  styleUrls: ['./books-add.component.scss']
})
export class BooksAddComponent {
  addBookForm: FormGroup = this.initializeAddBookForm();
  book: BookDto = {} as BookDto;
  allGenres: string[] = [];
  allAuthors: BookAuthorInfoDto[] = [];
  editMode = false;
  bookId: string | null = null;

  constructor(
    private _formBuilder: FormBuilder,
    private bookService: BookService,
    private authorService: AuthorService,
    private route: ActivatedRoute
  ) {
  }

  initializeGenres(){
    this.bookService.getAllGenres().subscribe(response =>{
      this.allGenres = response
    })
  }
  initializeAuthors(){
    this.authorService.getAllAuthors().subscribe(response => {
      this.allAuthors = response;
    })
  }

  ngOnInit() {
    this.initializeGenres()
    this.initializeAuthors()

    // Check if in edit mode and populate form
    this.route.paramMap.subscribe(params => {
      this.bookId = params.get('bookId');
      if (this.bookId) {
        console.log("Is inside edit mode")
        this.editMode = true;
        this.populateFormForEdit(this.bookId);
      }
      else {
        console.log("Is not edit mode")
      }
    });
  }

  initializeAddBookForm() {
    return (this.addBookForm = this._formBuilder.group({
      id: [''],
      isbn: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      datePublished: [null, Validators.required],
      coverImageUrl: ['', Validators.required],
      price: [0, Validators.required],
      totalPages: [0, Validators.required],
      isValid: [false, Validators.required],
      genres: [],
      authors: [],
    }));

  }



  populateFormForEdit(bookId: string) {
    // Retrieve book data from service using bookId
    this.bookService.getBookById(bookId).subscribe(response => {
      this.book = response;
      console.log("This is the book I'm getting " + this.book.name)
      // Populate form controls with book data

      const selectedGenres = this.book.genres; // Assuming this is an array of selected genre values
      this.addBookForm.get('genres')!.setValue(selectedGenres);

      const selectedAuthorIds = this.book.authors.map(author => author.id); // Assuming this is an array of selected author ids
      this.addBookForm.get('authors')!.setValue(selectedAuthorIds);

      const datePublished = new Date(this.book.datePublished);

      this.addBookForm.patchValue({
        id: this.book.id,
        isbn: this.book.isbn,
        name: this.book.name,
        description: this.book.description,
        datePublished: datePublished.toISOString().substring(0, 10),
        coverImageUrl: this.book.coverImageUrl,
        price: this.book.price,
        totalPages: this.book.totalPages,
      });
    });
  }

  onSubmit() {
    if (this.addBookForm.valid) {
      if (this.editMode) {
        this.onSubmitEdit();
      } else {
        this.onSubmitAdd();
      }
    }
  }


  onSubmitAdd() {
    console.log("INSIDE SUBMIT")
    if (this.addBookForm.invalid) {
      console.log("Invalid form")
      return;
    }

    this.book = {
      id: '',
      isbn: this.addBookForm.value.isbn,
      name: this.addBookForm.value.name,
      description: this.addBookForm.value.description,
      datePublished: this.addBookForm.value.datePublished,
      coverImageUrl: this.addBookForm.value.coverImageUrl,
      price: this.addBookForm.value.price,
      totalPages: this.addBookForm.value.totalPages,
      isValid: true,
      genres: this.addBookForm.value.genres,
      authors: [],
      authorIds: this.addBookForm.value.authors
    };

    console.log('Book sent:', this.book);

    this.bookService.addBook(this.book).subscribe(response => {
      console.log('Book added:', response);
    });
  }

  onSubmitEdit() {
    this.book = {
      id: this.addBookForm.value.id,
      isbn: this.addBookForm.value.isbn,
      name: this.addBookForm.value.name,
      description: this.addBookForm.value.description,
      datePublished: this.addBookForm.value.datePublished,
      coverImageUrl: this.addBookForm.value.coverImageUrl,
      price: this.addBookForm.value.price,
      totalPages: this.addBookForm.value.totalPages,
      isValid: true,
      genres: this.addBookForm.value.genres,
      authors: [],
      authorIds: this.addBookForm.value.authors
    };
    this.bookService.updateBook(this.book).subscribe(response => {
      console.log('Book edited:', response);
    });
  }


}
