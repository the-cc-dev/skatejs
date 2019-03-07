import { CustomElement } from './types';

let rendering: CustomElement | void = null;

export function getRendering(): CustomElement {
  if (rendering) {
    return rendering;
  }
  throw new Error('Attempting to get rendering element oustide of a render().');
}

export function setRendering(element: CustomElement | void = null) {
  rendering = element;
}
