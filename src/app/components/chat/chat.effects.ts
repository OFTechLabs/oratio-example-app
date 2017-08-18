import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as chat from './chat.action';
import { ChatGiveAnswerAction } from './chat.action';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/mergeMap';
import { AppHiveMind } from '../../oratio/HiveMindFactory';
import { RootState } from '../../reducers/index';

@Injectable()
export class ChatEffects {

  // @Todo: We should really hook up Oratio here since 42 might not be the answer to every question.
  @Effect()
  downloadCheckReport$: Observable<Action> = this.actions$
    .ofType<chat.AskQuestionAction>(chat.ASK_QUESTION)
    .map(action => action.payload)
    .mergeMap((question: string) => {
      return this.hiveMind.mind.process(question, 'en', this.rootState)
        .then(answer => new ChatGiveAnswerAction(answer.response()))
        .catch(err => new ChatGiveAnswerAction('Error!!'));
    });

  constructor(private actions$: Actions, private hiveMind: AppHiveMind, private rootState: Store<RootState>) {
  }
}
