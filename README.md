# Dhkea.JS

A high performance javascript implementation of Diffie–Hellman Key Exchange algorithm. Dhkea.JS implements all MODP groups defined in RFC2409 and RFC3526.

## Features
- :rabbit: Implements all MODP groups defined in RFC2409 and RFC3526
- :rabbit: High performance
- :rabbit: Support both Node.JS and browser side
- :rabbit: Full typescript support is provided

## Usage

```javascript
  const { generateIndividualKey, getSharedKey } = require('dhkea');

  // Alice's individual key, containing private key and public key
  const aliceKey = generateIndividualKey(); 

  // Bob's individual key
  const bobKey = generateIndividualKey();

  // Alice can get the shared key via her private key and bob's public key
  const sharedKeyCaculatedByAlice = getSharedKey(aliceKey.privateKey, bobKey.publicKey);

  // Bob can get the shared key via his private key and alice's public key
  const sharedKeyCaculatedByBob = getSharedKey(bobKey.privateKey, aliceKey.publicKey);

  // Diffie–Hellman Key Exchange algorithm gurantees that these two keys are the same
  console.log(sharedKeyCaculatedByAlice === sharedKeyCaculatedByBob); // true

```

## License

Dhkea.JS is licensed under GNU Lesser General Public License 2.1.
