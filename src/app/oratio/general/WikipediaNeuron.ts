import {
  IHiveMindNeuron,
  INeuronResponse,
  LocalizedWordsForLocaleFactory,
  LocalizedWordsMatcherNeuron,
  RequestContext,
  Sequence,
  SequenceParser, Sequences,
  Silence,
  SimpleResponse,
  WordAfterSequenceParser,
} from '@oratio/oratio';
import { knownWords } from './WikipediaNeuron.words';
import wiki from 'wikijs';

export class WikipediaNeuron implements IHiveMindNeuron {

  process(words: string[], locale: string, context: RequestContext): Promise<INeuronResponse> {
    const initialResponsePromise = new LocalizedWordsMatcherNeuron(knownWords, 'oratio.modules.knowledge.wikipedia')
      .process(words, locale, context);

    return new Promise(resolve => {
      initialResponsePromise.then((response: INeuronResponse) => {
        if (response.hasAnswer()) {

          const localizedKnownWords: string[] = LocalizedWordsForLocaleFactory.createMain(knownWords, locale);
          const sequences: Sequences = SequenceParser.parse(localizedKnownWords);
          const parser = new WordAfterSequenceParser(
            sequences.sequences.map((sequence: Sequence) => sequence.sequence.split(' ')),
          );

          const query: string = parser.parse(words).reduce((w1, w2) => w1 + ' ' + w2);

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
