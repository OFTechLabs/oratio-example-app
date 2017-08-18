import { knownWords } from './HelpNeuron.words';
import {
  IHiveMindNeuron, INeuronResponse, LocalizedWordsForLocaleFactory, MultipleSequenceNeuron, RequestContext, Sequence,
  SequenceParser,
} from '@oratio/oratio';

export class HelpNeuron implements IHiveMindNeuron {

  process(words: string[], locale: string, context: RequestContext): Promise<INeuronResponse> {
    const localizedKnownWords = LocalizedWordsForLocaleFactory.createMain(knownWords, locale).words;

    const sequences = SequenceParser.parse(localizedKnownWords);

    return new MultipleSequenceNeuron(
      sequences.singleWord.map(
        (sequence: Sequence) => sequence.withoutSpaces,
      ),
      sequences.twoWords.map(
        (sequence: Sequence) => sequence.withoutSpaces,
      ),
      sequences.threeWords.map(
        (sequence: Sequence) => sequence.withoutSpaces,
      ),
      sequences.fourWords.map(
        (sequence: Sequence) => sequence.withoutSpaces,
      ),
      'You can use Oratio to do some Math, navigate pages and a bunch of other stuff.',
    ).process(words, locale, context);
  }
}
