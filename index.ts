import rawGroups from './src/data/primes.json';
import { quickPowMod, randomBigint } from './src/utils';

export type ModpGroupId = 1 | 2 | 5 | 14 | 15 | 16 | 17 | 18;

const groups = Object.fromEntries(
  Object.entries(rawGroups).map(([id, group]) => [
    id,
    {
      id: group.id,
      generator: BigInt(group.generator),
      digits: group.digits,
      prime: BigInt(group.prime),
    },
  ])
);


export function getOakleyGroupInfo(id: ModpGroupId = 14) {
  return groups[id];
}

export function generateIndividualKey(id: ModpGroupId = 14) {
  const { generator, prime } = getOakleyGroupInfo(id);
  const privateKey = randomBigint(prime);
  return {
    privateKey,
    publicKey: quickPowMod(generator, privateKey, prime),
  };
}

export function getSharedKey(
  myPrivateKey: bigint,
  theirPublicKey: bigint,
  id: ModpGroupId = 14
) {
  const { prime } = getOakleyGroupInfo(id);
  return quickPowMod(theirPublicKey, myPrivateKey, prime);
}
