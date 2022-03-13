/** Calculates x, x ** 2, x ** 4, x ** 8, ... x ** (2 ** (digit-1)) */
export function expTable(x: bigint, digit: number, p: bigint) {
  const result: bigint[] = [x];
  for (
    let cur = x, i = 1;
    i < digit;
    i++, cur = (cur * cur) % p, result.push(cur)
  );
  return result;
}

/** Calculates x ** y % p.
 *  Time complexity: O(n^2).
 */
export function quickPowMod(x: bigint, y: bigint, p: bigint) {
  const yBin = y.toString(2).split('').reverse();
  const xExpTable = expTable(x, yBin.length, p);

  let result = 1n;
  for (let i = 0; i < yBin.length; i++)
    yBin[i] === '1' && (result = (result * xExpTable[i]) % p);
  return result;
}

/** Generates a random number between 0~(x-1).
 *  Time complexity: O(n)
 */
export function randomBigint(x: bigint) {
  const xBin = x
    .toString(2)
    .split('')
    .map((val) => (val === '0' ? 0 : 1));
  const result: number[] = [];

  let samePrefix = true;
  for (let i = 0; i < xBin.length; i++) {
    !samePrefix
      ? result.push(Math.random() > 0.5 ? 1 : 0)
      : xBin[i] === 0
      ? result.push(0)
      : (() => {
          // Assume that x=[x0x1...xi...] and y=[y0y1...yi...]
          // Evaluate p(yi=xi|yk=xk for all k<i). Precision: 2^(-30)
          let r = 1,
            k = Math.min(xBin.length - i, 30);
          for (let j = i; j < i + k; j++, r = (r << 1) | xBin[j]);
          const currentDigit = Math.random() < (1 << k) / r ? 0 : 1;
          samePrefix = currentDigit === xBin[i];
          result.push(currentDigit);
        })();
  }
  return BigInt('0b' + result.join(''));
}

/** The replacer used to stringify bigint */
export function bigintReplacer(key: string, value: unknown) {
  return typeof value === 'bigint' ? value.toString() : value;
}
