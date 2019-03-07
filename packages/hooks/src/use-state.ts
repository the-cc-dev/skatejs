import { getRendering } from './rendering';

export function useState<ValueType>(value: ValueType = null): Array<any> {
  const setState = (newValue: ValueType) => {
    value = newValue;
    getRendering().forceUpdate();
  };
  return [value, setState];
}
