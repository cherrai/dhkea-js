import { readFile, writeFile } from 'fs/promises';
import { resolve } from 'path/posix';
import { bigintReplacer } from '../utils';

async function main() {
  const raw = await readFile(resolve(__dirname, '../data/primes.txt'), {
    encoding: 'utf-8',
  });
  const groups = Object.fromEntries(
    raw
      .split('\n')
      .filter((line) => !line.startsWith('#'))
      .join('\n')
      .split('\n\n')
      .map((groupStr) => groupStr.split('\n').filter((line) => line !== ''))
      .filter((group) => group.length >= 3)
      .map((group) => [
        group[1],
        {
          id: group[0],
          bitLen: group[1],
          generator: group[2],
          prime: BigInt('0x' + group.slice(3).join('').replaceAll(' ', '')),
        },
      ])
  );
  await writeFile(
    resolve(__dirname, '../data/primes.json'),
    JSON.stringify(groups, bigintReplacer, 2)
  );
}

main();
