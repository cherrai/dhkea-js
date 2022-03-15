import './libs/extends';

describe('suite.meta.matcher|toBeBigInt', () => {
  test('test.meta.matcher.pass|toBeBigInt|2+2=4', () => {
    expect(() => expect(2n + 2n).toBeBigInt(4n)).not.toThrow();
  });
  test('test.meta.matcher.fail|toBeBigInt|2+2=5', () => {
    expect(() => expect(2n + 2n).toBeBigInt(5n)).toThrow(
      'Expected: 5\nReceived: 4'
    );
  });
  test('test.meta.matcher.notpass|toBeBigInt|2+2!=4', () => {
    expect(() => expect(2n + 2n).not.toBeBigInt(4n)).toThrow(
      'Expected: 4\nReceived: 4'
    );
  });
});
