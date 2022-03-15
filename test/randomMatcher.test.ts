import './libs/extends';
import { cases } from './constants/randTestCases';

describe('suite.meta.matcher|toBeRandom', () => {
  const goodGenerator = (x: bigint) =>
    BigInt(Math.floor(Math.random() * Number(x)));
  const badGenerator = (x: bigint) =>
    BigInt(Math.floor(parseFloat(Math.random().toFixed(1)) * Number(x)));

  test.each(cases)(
    'test.meta.matcher.pass|toBeRandom|goodGenerator|%i',
    (upperBound) => {
      expect(() => expect(goodGenerator).toBeRandom(upperBound)).not.toThrow();
    }
  );

  test.each(cases)(
    'test.meta.matcher.fail|toBeRandom|badGenerator|%i',
    (upperBound) => {
      expect(() => expect(badGenerator).toBeRandom(upperBound)).toThrow();
    }
  );

  test.each(cases)(
    'test.meta.matcher.notpass|toBeRandom|goodGenerator|%i',
    (upperBound) => {
      expect(() => expect(goodGenerator).not.toBeRandom(upperBound)).toThrow();
    }
  );
});
