const MAX = 1 << 52;

export function randMax(max: number = MAX) {
  return BigInt(Math.floor(Math.random() * max));
}
