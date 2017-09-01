import { IHiveMindNeuron, INeuronResponse, RequestContext, Silence, SimpleResponse, UserInput } from '@oratio/oratio';
import { easterEggs } from './EasterEggs';
import { InputOutputMatcher } from './InputOutputMatcher';

export class EasterEggNeuron implements IHiveMindNeuron {

  process(input: UserInput, context: RequestContext): Promise<INeuronResponse> {
    const match = InputOutputMatcher.match(input.words(), easterEggs);

    if (match.certainty > 0.3) {
      return Promise.resolve(new SimpleResponse(
        match.output,
        [],
        match.certainty,
      ));
    }

    return Promise.resolve(new Silence());
  }
}
