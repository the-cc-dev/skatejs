import mount, { wait } from '@skatejs/bore';
import { createFunctionalFactory } from '..';
import Element from '..';

const factory = createFunctionalFactory(Element);

test('renders', async () => {
  const Elem = factory(() => `test`);
  const elem = mount(new Elem());
  await wait();
  expect(elem.shadowRoot.textContent).toBe('test');
});
