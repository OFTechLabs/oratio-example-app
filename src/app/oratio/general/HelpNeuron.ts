import { IHiveMindNeuron, INeuronResponse, LocalizedWordsMatcherNeuron, RequestContext, } from '@oratio/oratio';
import { knownWords } from './HelpNeuron.words';

export class HelpNeuron implements IHiveMindNeuron {

  process(words: string[], locale: string, context: RequestContext): Promise<INeuronResponse> {
    return new LocalizedWordsMatcherNeuron(knownWords, 'Oratio supports a range of commands, ' +
      'you can try the following: \'navigate to\', \'what is\', \'who is\', \'toggle\', \'clear\'')
      .process(words, locale, context);
  }
}
