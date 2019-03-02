import { CustomElement, CustomElementConstructor, PropTypes } from './types';

export function createFunctionalFactory(Base: CustomElementConstructor) {
  return (render: (elem: CustomElement) => any, props: PropTypes = null) => {
    return class extends Base {
      static props = props;
      render() {
        return render(this);
      }
    };
  };
}
