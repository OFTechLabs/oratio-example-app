import { Component, OnInit } from '@angular/core';
import { RootState } from '../../reducers/index';
import { Store } from '@ngrx/store';
import { Go } from '../../routing/routing.actions';

@Component({
  selector: 'app-page-one',
  templateUrl: './page-one.component.html',
  styleUrls: ['./page-one.component.scss']
})
export class PageOneComponent implements OnInit {

  constructor(private store: Store<RootState>) {
  }

  ngOnInit() {
  }

  goToPageThree() {
    this.store.dispatch(new Go({path: ['/page-three']}));
  }

}
