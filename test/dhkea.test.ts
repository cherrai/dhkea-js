import './libs/extends';
import groups from '../src/data/primes.json';
import { generateIndividualKey, getSharedKey } from '../src/index';

describe('suite.app|dhkea', () => {
  test.each(
    Object.values(groups)
      .map(({ id }) => Array(5).fill([id]))
      .flat()
  )('test.app|dhkea|id=%i', (id) => {
    const aliceKey = generateIndividualKey(id);
    const bobKey = generateIndividualKey(id);
    const sharedKeyCaculatedByAlice = getSharedKey(
      aliceKey.privateKey,
      bobKey.publicKey,
      id
    );
    const sharedKeyCaculatedByBob = getSharedKey(
      bobKey.privateKey,
      aliceKey.publicKey,
      id
    );
    expect(sharedKeyCaculatedByAlice === sharedKeyCaculatedByBob).toBe(true);
  });
});
