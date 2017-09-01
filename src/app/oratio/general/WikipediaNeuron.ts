import {
  IHiveMindNeuron,
  INeuronResponse,
  LocalizedWordsForLocaleFactory,
  LocalizedWordsMatcherNeuron,
  RequestContext,
  Sequence,
  SequenceParser,
  Silence,
  SimpleResponse,
  UserInput,
  WordAfterSequenceParser,
} from '@oratio/oratio';
import { knownWords } from './WikipediaNeuron.words';
import wiki from 'wikijs';

export class WikipediaNeuron implements IHiveMindNeuron {

  process(input: UserInput, context: RequestContext): Promise<INeuronResponse> {
    if (!context.hints().isAllowedToMakeCallOverNetwork()) {
      return Promise.resolve(new Silence());
    }

    const initialResponsePromise = new LocalizedWordsMatcherNeuron(knownWords, 'oratio.modules.knowledge.wikipedia')
      .process(input, context);

    return new Promise(resolve => {
      initialResponsePromise.then((response: INeuronResponse) => {
        if (response.hasAnswer()) {

          const localizedKnownWords = LocalizedWordsForLocaleFactory.createMain(knownWords, context.locale());
          const sequences = SequenceParser.parse(localizedKnownWords);
          const parser = new WordAfterSequenceParser(
            sequences.sequences.map((sequence: Sequence) => sequence.sequence.split(' ')),
          );

          const query: string = parser.parse(input.words()).reduce((w1, w2) => w1 + ' ' + w2);

          wiki().search(query, 1).then(data => {
            if (data === null || data === undefined) {
              resolve(new Silence());
              return;
            }
            wiki().page(data.results[0]).then(page => {
              page.summary().then(summary => {
                resolve(new SimpleResponse('oratio.modules.knowledge.wikipedia', [summary], 0.5));
              }).catch(() => resolve(new Silence()));
            }).catch(() => resolve(new Silence()));
          }).catch(() => resolve(new Silence()));
        } else {
          resolve(response);
        }
      });
    });
  }
}
