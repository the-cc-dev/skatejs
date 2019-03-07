import { getRendering, setRendering } from '..';

class Test extends HTMLElement {
  forceUpdate() {}
  render() {}
}

test('getRendering', () => {
  expect(() => getRendering()).toThrow(Error);
});

test('setRendering', () => {
  const test = new Test();
  setRendering(test);
  expect(getRendering()).toBe(test);
  setRendering();
  expect(setRendering()).toBe(null);
});
