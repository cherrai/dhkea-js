interface CustomMatchers<R = unknown> {
  toBeBigInt(value: bigint): R;
  toBeRandom(
    upperBound: bigint,
    count: number = 8192,
    eps: number = 0.01
  );
}

declare namespace jest {
  interface Expect extends CustomMatchers {}
  interface Matchers<R> extends CustomMatchers<R> {}
  interface InverseAsymmetricMatchers extends CustomMatchers {}
}
