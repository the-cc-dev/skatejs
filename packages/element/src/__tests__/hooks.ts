import mount, { wait } from '@skatejs/bore';
import { createFunctionalFactory, useState } from '..';
import Element from '..';

const factory = createFunctionalFactory(Element);

test('useState', async () => {
  let setElemCount;
  const Elem = factory(e => {
    const [count, setCount] = useState(0);
    setElemCount = setCount;
    return count;
  });
  const elem = mount(new Elem());
  await wait();
  expect(elem.shadowRoot.textContent).toBe('0');
  setElemCount(1);
  expect(elem.shadowRoot.textContent).toBe('1');
});
