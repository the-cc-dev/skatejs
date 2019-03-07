import { setRendering } from './rendering';
import { CustomElementConstructor } from './types';

export function withHooks(
  Base: CustomElementConstructor
): CustomElementConstructor {
  return class extends Base {
    render(...args) {
      setRendering(this);
      const retval = super.render(...args);
      setRendering();
      return retval;
    }
  };
}
