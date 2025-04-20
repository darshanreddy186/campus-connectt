function add(a: number, b: number): number {
  return a + b;
}

test('adds two numbers correctly', () => {
  expect(add(2, 2)).toBe(4);
  expect(add(5, 3)).toBe(8);
  expect(add(-1, 1)).toBe(0);
});
