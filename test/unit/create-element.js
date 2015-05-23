'use strict';

import helpers from '../lib/helpers';
import skate from '../../src/index';

describe('create-element', function () {
  function resolved (element) {
    return element.hasAttribute('resolved');
  }

  it('If parentElementName is not provided, use elementName to lookup the definition in the registry.', function () {
    var { safe: tagName } = helpers.safeTagName();
    skate(tagName, {});
    expect(resolved(document.createElement(tagName))).to.equal(true);
    expect(resolved(document.createElement('div', tagName))).to.equal(false);
  });

  it('If parentElementName is provided, use it to lookup the definition in the registry.', function () {
    var { safe: tagName } = helpers.safeTagName();
    skate(tagName, { extends: 'div' });
    expect(resolved(document.createElement(tagName))).to.equal(false);
    expect(resolved(document.createElement('div', tagName))).to.equal(true);
  });

  it('If no registry entry is found, create the element using the saved method and return it.', function () {
    var { safe: tagName } = helpers.safeTagName();
    expect(resolved(document.createElement(tagName))).to.equal(false);
    expect(resolved(document.createElement('div', tagName))).to.equal(false);
  });

  it('If a registry entry matches parentElementName, and elementName does not match the value of the extends property, create the element from elementName and set the "is" attribute to parentElementName but do not initialise it.', function () {
    var { safe: tagName } = helpers.safeTagName();
    skate(tagName, { extends: 'div' });
    var span = document.createElement('span', tagName);
    expect(span.getAttribute('is')).to.equal(tagName);
    expect(resolved(span)).to.equal(false);
  });

  it('If a registry entry is found, use it to create the element and return it.', function () {
    var { safe: tagName } = helpers.safeTagName();
    skate(tagName, {});
    expect(resolved(document.createElement(tagName))).to.equal(true);
  });
});
