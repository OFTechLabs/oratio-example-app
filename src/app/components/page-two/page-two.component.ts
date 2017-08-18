import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from '../../reducers/index';
import { ToggleCheckboxAction } from './page-two.actions';
import { Observable } from 'rxjs/Observable';
import { getChecked } from './page-two.reducer';

@Component({
  selector: 'app-page-two',
  templateUrl: './page-two.component.html',
  styleUrls: ['./page-two.component.scss']
})
export class PageTwoComponent implements OnInit {

  checked$: Observable<boolean>;

  constructor(private store: Store<RootState>) {
    this.checked$ = store.select(getChecked);
  }

  ngOnInit() {
  }

  toggleChecked() {
    this.store.dispatch(new ToggleCheckboxAction());
  }

}
