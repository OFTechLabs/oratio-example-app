import { IHiveMindNeuron, INeuronResponse, LocalizedWordsMatcherNeuron, RequestContext, } from '@oratio/oratio';
import { knownWords } from './HelpNeuron.words';

export class HelpNeuron implements IHiveMindNeuron {

  process(words: string[], locale: string, context: RequestContext): Promise<INeuronResponse> {
    return new LocalizedWordsMatcherNeuron(knownWords, 'You can use Oratio to do some Math, navigate pages and a bunch of other stuff.')
      .process(words, locale, context);
  }
}
