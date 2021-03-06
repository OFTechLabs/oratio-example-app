import {
  ActionResponse, ActionWithContextResponse,
  IHiveMindNeuron,
  INeuronResponse,
  LocalizedWordsMatcherNeuron,
  RequestContext,
  SimpleResponse,
} from '@oratio/oratio';
import { knownWords } from './ClearNeuron.words';
import { Injectable } from '@angular/core';
import { RootState } from '../../reducers/index';
import { Store } from '@ngrx/store';
import { ClearAction } from '../../components/chat/chat.actions';

@Injectable()
export class ClearNeuron implements IHiveMindNeuron {

  constructor(private store: Store<RootState>) {
  }

  process(words: string[], locale: string, context: RequestContext): Promise<INeuronResponse> {
    return new LocalizedWordsMatcherNeuron(knownWords, '')
      .process(words, locale, context).then(initialResponse => {
        if (initialResponse instanceof SimpleResponse) {
          const action = this.createAction();
          return new ActionWithContextResponse(
            initialResponse.response,
            initialResponse.params,
            initialResponse.getCertainty(),
            action,
            this
          );
        }

        return initialResponse;
      });
  }

  private createAction(): () => void {
    return () => {
      this.store.dispatch(new ClearAction());
    };
  }
}
