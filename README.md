# Dhkea.JS

A high performance javascript implementation of Diffie–Hellman Key Exchange algorithm. Dhkea.JS implements all MODP groups defined in RFC2409 and RFC3526.

## Features
- :rabbit: Implements all MODP groups defined in RFC2409 and RFC3526
- :rabbit: High performance
- :rabbit: Support both Node.JS and browser side
- :rabbit: Full typescript support is provided

## Usage

```javascript
  const { generateIndividualKey, getSharedKey } = require('dhkea-js');

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

## MODP Group
MODP group is first defined in RFC2409 to do the Diffie-Hellman Key Exchange and is later extended in RFC 3526. Each MODP group contains the prime and its generator. 

Dhkea.JS implements all the MODP groups defined in RFC2409 and RFC3526, with id 1, 2, 5, 14, 15, 16, 17, 18 whose bit length of the prime is 768, 1024, 1536, 2048, 3072, 4096, 6144, 8192 respectively.
## API

### `generateIndividualKey()`

**Syntax**
```typescript
  generateIndiviualKey(bitLen?: ModpBitLen): {
    privateKey: bigint;
    publicKey: bigInt;
  }
```

Generate an indiviual key pair with the MODP group with bit length `bitLen`. If `bitLen` is omited, the 2048-bits MODP Group(id = 14) will be used. 
### `getSharedKey()`

**Syntax**
```typescript
getSharedKey(myPrivatedKey: bigint, theirPublicKey: bigint, bitLen?: ModpBitLen): bigint
```
Calculate the shared keys from my private key and their public key, using the MODP Group with bit length `bitLen`. If `bitLen` is omited, use the default 2048-bits MODP Group(id = 14).

### `getModpGroupInfo()`
**Syntax**
```typescript
getModpGroupInfo(bitLen: ModpBitLen): {
  id: ModpGroupId;
  generator: bigint;
  bitLen: ModpBitLen;
  prime: bigint;
}
```

Get the info of the MODP Group with bit length `bitLen`. 
## License

Dhkea.JS is licensed under GNU Lesser General Public License 2.1.
