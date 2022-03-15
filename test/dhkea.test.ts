import './libs/extends';
import groups from '../dist/data/primes.json';
import { generateIndividualKey, getSharedKey } from '../dist/index';

describe('suite.app|dhkea', () => {
  test.each(
    Object.values(groups)
      .map(({ bitLen }) => Array(5).fill([bitLen]))
      .flat()
  )('test.app|dhkea|bitLen=%i', (bitLen) => {
    const aliceKey = generateIndividualKey(bitLen);
    const bobKey = generateIndividualKey(bitLen);
    const sharedKeyCaculatedByAlice = getSharedKey(
      aliceKey.privateKey,
      bobKey.publicKey,
      bitLen
    );
    const sharedKeyCaculatedByBob = getSharedKey(
      bobKey.privateKey,
      aliceKey.publicKey,
      bitLen
    );
    expect(sharedKeyCaculatedByAlice === sharedKeyCaculatedByBob).toBe(true);
  });
});
