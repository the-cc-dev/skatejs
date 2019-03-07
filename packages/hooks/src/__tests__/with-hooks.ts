import withHooks, { getRendering } from '..';

test('withHooks', done => {
  const Test = withHooks(
    class extends HTMLElement {
      forceUpdate() {}
      render() {
        expect(getRendering()).toBe(this);
        done();
      }
    }
  );
  const test = new Test();
  test.render();
});
