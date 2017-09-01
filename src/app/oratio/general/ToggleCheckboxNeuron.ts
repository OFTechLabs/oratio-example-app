import {
  IHiveMindNeuron, INeuronResponse, LocalizedWordsMatcherNeuron, RequestContext, SimpleResponse,
  UserInput,
} from '@oratio/oratio';
import { knownWords } from './ToggleCheckbox.words';
import { Injectable } from '@angular/core';
import { RootState } from '../../reducers/index';
import { Store } from '@ngrx/store';
import { ToggleCheckboxAction } from '../../components/page-two/page-two.actions';

@Injectable()
export class ToggleCheckboxNeuron implements IHiveMindNeuron {

  constructor(private store: Store<RootState>) {
  }

  process(input: UserInput, context: RequestContext): Promise<INeuronResponse> {
    const initialResponsePromise = new LocalizedWordsMatcherNeuron(knownWords, 'oratio.modules.togglecheckbox')
      .process(input, context);

    return new Promise(resolve => {
      initialResponsePromise.then((response: INeuronResponse) => {
        if (response.hasAnswer()) {
          this.store.dispatch(new ToggleCheckboxAction());
          resolve(new SimpleResponse('Toggle checkbox on page 2', [], 0.5));
        } else {
          resolve(response);
        }
      });
    });
  }
}
