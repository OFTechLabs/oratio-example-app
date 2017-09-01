import {
  IHiveMindNeuron,
  INeuronResponse,
  LocalizedWordsMatcherNeuron,
  RequestContext,
  UserInput,
} from '@oratio/oratio';
import { knownWords } from './HelpNeuron.words';

export class HelpNeuron implements IHiveMindNeuron {

  process(input: UserInput, context: RequestContext): Promise<INeuronResponse> {
    return new LocalizedWordsMatcherNeuron(knownWords, 'Oratio supports a range of commands, you can try the ' +
      'following: \'navigate to\', \'what is\', \'who is\', \'toggle\', \'clear\'')
      .process(input, context);
  }
}
