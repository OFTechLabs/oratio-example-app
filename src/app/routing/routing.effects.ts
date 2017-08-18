import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Actions, Effect } from '@ngrx/effects';
import { BACK, FORWARD, GO, Go } from './routing.actions';

@Injectable()
export class RoutingEffects {
  @Effect({dispatch: false})
  navigate$ = this.actions$.ofType(GO)
    .map((action: Go) => action.payload)
    .do(({path, query: queryParams, extras}) => this.router.navigate(path, {queryParams, ...extras}));

  @Effect({dispatch: false})
  navigateBack$ = this.actions$.ofType(BACK)
    .do(() => this.location.back());

  @Effect({dispatch: false})
  navigateForward$ = this.actions$.ofType(FORWARD)
    .do(() => this.location.forward());

  constructor(private actions$: Actions,
              private router: Router,
              private location: Location) {
  }
}
