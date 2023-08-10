import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {debounceTime, distinctUntilChanged, filter, } from 'rxjs/operators';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements  OnInit, OnDestroy {
  searchAndFilterForm: FormGroup = this.initializeForm();
  searchAndFilterFormSubscription = new Subscription();
  queryParamsMap: Map<string, any> = new Map<string, any>();

  constructor(
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initializeForm()
    this.subscribeToFormChanges()
  }

  initializeForm() {
    return this._formBuilder.group({
      searchAndFilter: this._formBuilder.group({
        sortValue: [''],
        searchValue: ['']
      })
    });
  }

  subscribeToFormChanges() {
    this.searchAndFilterFormSubscription = this.searchAndFilterForm.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        filter((value) => value)
      )
      .subscribe(() => {
        this.loadBooks();
      });
  }

  loadBooks() {
    const searchValue = this.searchAndFilterForm.get('searchAndFilter.searchValue')!.value;
    const sortValue = this.searchAndFilterForm.get('searchAndFilter.sortValue')!.value;
    this.fillQueryParamsMap(searchValue, sortValue)
  }

  fillQueryParamsMap(searchValue: string, sortValue: string) {
    if (searchValue != null) {
      this.queryParamsMap.set('searchValue', searchValue)
    }
    if (sortValue != null) {
      this.queryParamsMap.set('sortValue', sortValue)
    }
  }

  get filterRequest() {
    const request = {} as any
    this.queryParamsMap.forEach(function(value,key){
      request[key] = value
    })
    return { ...request }
  }

  ngOnDestroy(): void {
    this.searchAndFilterFormSubscription.unsubscribe();
  }

}
