import { randomBigint } from '../src/utils';
import { generateIndividualKey, getSharedKey } from '../src/index';

function randomBigintTester(n: bigint) {
  function freq(rate: number, result: number[], range: number) {
    console.log(
      rate.toFixed(1),
      result.filter((val) => val < range * rate).length / result.length
    );
  }

  const result = Array(20000)
    .fill(0)
    .map(() => randomBigint(n))
    .map((val) => Number(val));

  console.log('Frequency Analysis');
  console.log('Upper limit', n);
  Array(10)
    .fill(0)
    .map((val, index) => index * 0.1)
    .forEach((val) => freq(val, result, Number(n)));
}

// randomBigintTester(2n);
// randomBigintTester(3n);
// randomBigintTester(40n);
// randomBigintTester(99n);
// randomBigintTester(99999999n);
// randomBigintTester(999999999999999999999999999999999999999999999999999999999999999999n);

const aliceKey = generateIndividualKey(2);
const bobKey = generateIndividualKey(2);
const sharedKeyCaculatedByAlice = getSharedKey(aliceKey.privateKey, bobKey.publicKey, 2);
const sharedKeyCaculatedByBob = getSharedKey(bobKey.privateKey, aliceKey.publicKey, 2);

console.log(sharedKeyCaculatedByAlice);
console.log(sharedKeyCaculatedByBob);
console.log(sharedKeyCaculatedByAlice === sharedKeyCaculatedByBob);

Array(2000).fill(0).map((val,ind)=>ind).forEach((val,ind)=>{
  generateIndividualKey(18);
  console.log(ind, 'done');
});
