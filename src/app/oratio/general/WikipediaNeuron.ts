import {
  IHiveMindNeuron,
  INeuronResponse,
  LocalizedWordsForLocaleFactory,
  MultipleSequenceNeuron,
  RequestContext,
  Sequence,
  SequenceParser,
  Silence,
  SimpleResponse,
  WordAfterSequenceParser,
} from '@oratio/oratio';
import { knownWords } from './WikipediaNeuron.words';
import wiki from 'wikijs';

export class WikipediaNeuron implements IHiveMindNeuron {

  process(words: string[], locale: string, context: RequestContext): Promise<INeuronResponse> {
    let localizedKnownWords = LocalizedWordsForLocaleFactory.createMain(knownWords, locale).words;
    if (context.hasPreviousInput() && context.previousInput.neuronHandled instanceof WikipediaNeuron) {
      const continuations: string[] = LocalizedWordsForLocaleFactory.createContinuation(knownWords, locale).words;
      localizedKnownWords = localizedKnownWords.concat(continuations);
    }

    const sequences = SequenceParser.parse(localizedKnownWords);
    const initialResponsePromise: Promise<INeuronResponse> = (new MultipleSequenceNeuron(
      sequences.singleWord.map((sequence: Sequence) => sequence.withoutSpaces),
      sequences.twoWords.map((sequence: Sequence) => sequence.withoutSpaces),
      sequences.threeWords.map((sequence: Sequence) => sequence.withoutSpaces),
      [],
      'oratio.modules.knowledge.wikipedia'))
      .process(words, locale, context);

    return new Promise((resolve, reject) => {
      initialResponsePromise.then((response: INeuronResponse) => {
        if (response.hasAnswer()) {

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
              });
            });

          });
        } else {
          resolve(response);
        }
      });
    });
  }
}
