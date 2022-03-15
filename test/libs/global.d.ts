interface CustomMatchers<R = unknown> {
  toBeBigInt(value: bigint): R;
  toBeRandom(upperBound: bigint, count?: number, eps?: number);
}

declare namespace jest {
  interface Expect extends CustomMatchers {}
  interface Matchers<R> extends CustomMatchers<R> {}
  interface InverseAsymmetricMatchers extends CustomMatchers {}
}
