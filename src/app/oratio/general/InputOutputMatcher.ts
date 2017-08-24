import { LevenshteinDistanceMatcher, NumberOfKnownWordsCertaintyCalculator } from '@oratio/oratio';

export class InputOutputMatcher {

  public static match(input: string[], toMatchTo: { input: string, output: string }[]): { certainty: number, output: string } {
    let possibleMatch = {certainty: 0.0, output: ''};

    for (const toMatch of toMatchTo) {
      const result = InputOutputMatcher.processSequence(input, toMatch);

      if (result.certainty > possibleMatch.certainty) {
        possibleMatch = result;
      }
    }

    return possibleMatch;
  }

  private static processSequence(input: string[], toMatch: { input: string, output: string }): { certainty: number, output } {
    let maxCertainty = 0;
    const words = toMatch.input.split(' ');
    const singleInputWord = words.reduce((a, b) => a + b, '');

    for (let j = 0; j < input.length - (words.length - 1); j++) {
      const sequenceTogether = input.slice(j, j + (words.length)).reduce((a, b) => a + b, '');
      if (
        LevenshteinDistanceMatcher.MATCHER.matches(
          sequenceTogether,
          singleInputWord,
        )
      ) {

        const newMaxCertainty = NumberOfKnownWordsCertaintyCalculator.calculate(
          words.length,
          input,
        );
        if (newMaxCertainty > maxCertainty) {
          maxCertainty = newMaxCertainty;
        }
      }
    }

    return {certainty: maxCertainty, output: toMatch.output};
  }
}
