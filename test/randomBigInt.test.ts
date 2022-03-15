import './libs/extends';
import { cases } from './constants/randTestCases';
import { randomBigint } from '../src/utils';

describe('suite.function.correctness.fixed_input|randomBigInt', () => {
  test.each(cases)(
    'test.function.correctness.fixed_input|randomBigInt|%i',
    (upperBound) => expect(randomBigint).toBeRandom(upperBound)
  );
});
