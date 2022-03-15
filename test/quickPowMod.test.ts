import './libs/extends';
import { randMax } from './libs/utils';
import { quickPowMod } from '../dist/utils';

class QuickPowModTestCase {
  x: bigint;
  y: bigint;
  p: bigint;
  result: bigint;
  constructor(x: bigint, y: bigint, p: bigint) {
    this.x = x;
    this.y = y;
    this.p = p;
    this.result = x ** y % p;
  }
}

function runCorrectnessTest(type: string, cases: QuickPowModTestCase[]) {
  test.each(cases)(
    `${type}|quickPowMod|$x**$y%$p=$result`,
    ({ x, y, p, result }) => expect(quickPowMod(x, y, p)).toBeBigInt(result)
  );
}

describe('suite.function.correctness.random_input|quickPowMod', () => {
  const cases = Array(20)
    .fill(0)
    .map(() => {
      const x = randMax(),
        y = randMax(1 << 20),
        p = randMax();
      return new QuickPowModTestCase(x, y, p);
    });

  runCorrectnessTest('test.function.correctness.random_input', cases);
});

describe('suite.function.correctness.fixed_input|quickPowMod', () => {
  const cases = [
    new QuickPowModTestCase(1n, 0n, 2n),
    new QuickPowModTestCase(1n, 1n, 1n),
    new QuickPowModTestCase(2n, 6n, 7n),
    new QuickPowModTestCase(5n, 0n, 7n),
    new QuickPowModTestCase(0n, 0n, 2n),
  ];
  runCorrectnessTest('test.function.correctness.random_input', cases);
});
