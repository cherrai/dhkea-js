import { bigintReplacer } from '../../src/utils';

expect.extend({
  toBeBigInt(received: bigint, actual: bigint) {
    return {
      message: () => `Expected: ${actual}\nReceived: ${received}`,
      pass: received === actual,
    };
  },
});

expect.extend({
  toBeRandom(
    randGenerator: (upperBound: bigint) => bigint,
    upperBound: bigint,
    count: number = 131072,
    eps: number = 0.005
  ) {
    function evaluateAbsoulteError(freq: [number, number][]) {
      const exception = freq.filter(
        ([expected, actual]) => Math.abs(expected - actual) > eps
      );
      const avgError =
        freq.reduce(
          (prev, [expected, actual]) => prev + Math.abs(expected - actual),
          0
        ) / freq.length;

      return exception.length
        ? {
            message: () =>
              `The frequency of generated data between 0~${(
                exception[0][0] * 100
              ).toFixed(2)}% range ` +
              `is ${(exception[0][1] * 100).toFixed(2)}%.\n` +
              `This leads to an absolute error of ${Math.abs(
                exception[0][0] - exception[0][1]
              )}, which is beyond the preset epsilon = ${eps}.`,
            pass: false,
          }
        : avgError > eps
        ? {
            message: () =>
              `The average absoulte error of frequency distribution of generated data is ${avgError} ` +
              `which is beyond the preset epsilon = ${eps}`,
            pass: false,
          }
        : {
            message: () =>
              `The avaerage absolute error of generated data is ${avgError}.`,
            pass: true,
          };
    }

    const _upperBound = Number(upperBound);

    const result = Array(count)
      .fill(0n)
      .map(() => Number(randGenerator(upperBound) + 1n) / _upperBound);

    return upperBound <= 500n
      ? evaluateAbsoulteError(
          Array(_upperBound)
            .fill(0)
            .map((ind) => [
              (ind + 1) / _upperBound,
              result.filter((val) => val <= (ind + 1) / _upperBound)
                .length / count,
            ])
        )
      : evaluateAbsoulteError(
          Array(100)
            .fill(0)
            .map((ind) => [
              (ind + 1) * 0.01,
              result.filter((val) => val <= (ind + 1) * 0.01).length / count,
            ])
        );
  },
});
