import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as chat from './chat.actions';
import { ChatGiveAnswerAction } from './chat.actions';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/mergeMap';
import { AppHiveMind } from '../../oratio/AppHiveMind';
import { RootState } from '../../reducers/index';
import { I18nService } from '../../i18n/I18nService';
import { UnderstoodResponse } from '@oratio/oratio';

@Injectable()
export class ChatEffects {

  @Effect()
  downloadCheckReport$: Observable<Action> = this.actions$
    .ofType<chat.AskQuestionAction>(chat.ASK_QUESTION)
    .map(action => action.payload)
    .mergeMap((question: string) => {
      return this.hiveMind.mind.process(question, 'en', this.store)
        .then(answer => {
          if (answer instanceof UnderstoodResponse) {
            answer.action.call(answer.context, null);

            return new ChatGiveAnswerAction(this.i18nService.translate(answer.response(), answer.params));
          }

          return new ChatGiveAnswerAction(this.i18nService.translate(answer.response()));
        })
        .catch(err => new ChatGiveAnswerAction('Error!!'));
    });

  constructor(private actions$: Actions, private hiveMind: AppHiveMind, private store: Store<RootState>, private i18nService: I18nService) {
  }
}
