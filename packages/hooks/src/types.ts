export interface CustomElementConstructor {
  new (): CustomElement;
}

export interface CustomElement {
  forceUpdate(): void;
  render(...args: any): any;
}
