import { setRendering, useState } from '..';

class Test extends HTMLElement {
  forceUpdate() {}
  render() {}
}

test('useState', () => {
  const test = new Test();
  setRendering(test);
  const [count, setCount] = useState(0);
  setRendering();
});
