import {
  IHiveMindNeuron,
  INeuronResponse,
  LocalizedWordsForLocaleFactory,
  LocalizedWordsMatcherNeuron,
  RequestContext,
  Sequence,
  SequenceParser,
  Sequences,
  SimpleResponse,
  WordAfterSequenceParser,
} from '@oratio/oratio';
import { knownWords } from './NavigationNeuron.words';
import { Injectable } from '@angular/core';
import { RootState } from '../../reducers/index';
import { Store } from '@ngrx/store';
import { Go } from '../../routing/routing.actions';
import { routes } from '../../app-routing.module';

@Injectable()
export class NavigationNeuron implements IHiveMindNeuron {

  constructor(private store: Store<RootState>) {
  }

  process(words: string[], locale: string, context: RequestContext): Promise<INeuronResponse> {
    const initialResponsePromise = new LocalizedWordsMatcherNeuron(knownWords, 'oratio.modules.routing')
      .process(words, locale, context);

    return new Promise(resolve => {
      initialResponsePromise.then((response: INeuronResponse) => {
        if (response.hasAnswer()) {

          const localizedKnownWords: string[] = LocalizedWordsForLocaleFactory.createMain(knownWords, locale);
          const sequences: Sequences = SequenceParser.parse(localizedKnownWords);
          const parser: WordAfterSequenceParser = new WordAfterSequenceParser(
            sequences.sequences.map((sequence: Sequence) => sequence.sequence.split(' ')),
          );

          const requestedRoute: string = parser.parse(words).reduce((w1, w2) => w1 + ' ' + w2);
          const foundRoute: boolean = routes.filter(route => route.path === requestedRoute).length === 1;

          if (foundRoute) {
            this.store.dispatch(new Go({path: ['/' + requestedRoute]}));

            resolve(new SimpleResponse('Navigated to ' + requestedRoute, [], 0.5));
          } else {
            resolve(new SimpleResponse('Could not find the page ' + requestedRoute, [], 0.5));
          }
        } else {
          resolve(response);
        }
      });
    });
  }
}
