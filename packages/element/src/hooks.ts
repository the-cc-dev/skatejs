import Element from './element';

export function useState<ValueType>(value: ValueType = null): Array<any> {
  const { updating } = Element;
  const setState = (newValue: ValueType) => {
    value = newValue;
    updating.forceUpdate();
  };
  return [value, setState];
}
