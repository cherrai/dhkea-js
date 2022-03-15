import rawGroups from './data/primes.json';
import { quickPowMod, randomBigint } from './utils';

export type ModpGroupId = 1 | 2 | 5 | 14 | 15 | 16 | 17 | 18;
export type ModpBitLen = 768 | 1024 | 1536 | 2048 | 3072 | 4096 | 6144 | 8192;

const groups = Object.fromEntries(
  Object.entries(rawGroups).map(([bitLen, group]) => [
    group.bitLen,
    {
      id: group.id,
      generator: BigInt(group.generator),
      bitLen: group.bitLen,
      prime: BigInt(group.prime),
    },
  ])
);

export function getModpGroupInfo(bitLen: ModpBitLen = 2048) {
  return groups[bitLen];
}

export function generateIndividualKey(digits: ModpBitLen = 2048) {
  const { generator, prime } = getModpGroupInfo(digits);
  const privateKey = randomBigint(prime);
  return {
    privateKey,
    publicKey: quickPowMod(generator, privateKey, prime),
  };
}

export function getSharedKey(
  myPrivateKey: bigint,
  theirPublicKey: bigint,
  bitLen: ModpBitLen = 2048
) {
  const { prime } = getModpGroupInfo(bitLen);
  return quickPowMod(theirPublicKey, myPrivateKey, prime);
}
