import helpers from '../lib/helpers';
import skate from '../../src/skate';

describe('Attribute listeners', function () {
  'use strict';

  it('should listen to changes in specified attributes', function (done) {
    var created = false;
    var updated = false;

    skate('my-el', {
      attributes: {
        open: {
          created: function (element, data) {
            created = true;
            data.newValue.should.equal('created');
            element.setAttribute('open', 'updated');
          },
          updated: function (element, data) {
            updated = true;
            data.oldValue.should.equal('created');
            data.newValue.should.equal('updated');
            element.removeAttribute('open');
          },
          removed: function (element, data) {
            created.should.equal(true);
            updated.should.equal(true);
            data.oldValue.should.equal('updated');
            done();
          }
        }
      }
    });

    helpers.fixture('<my-el open="created"></my-el>');
  });

  it('should accept a function insead of an object for a particular attribute definition.', function (done) {
    skate('div', {
      attributes: {
        open: function (element, data) {
          if (data.type === 'created') {
            element.setAttribute('open', 'updated');
          } else if (data.type === 'updated') {
            element.removeAttribute('open');
          } else if (data.type === 'removed') {
            assert(true);
            done();
          }
        }
      }
    });

    helpers.fixture('<div id="attrtest" open="created"></div>');
  });

  it('should accept a function insead of an object for the entire attribute definition.', function (done) {
    skate('div', {
      attributes: function (element, data) {
        if (data.type === 'created') {
          setTimeout(function () {
            element.setAttribute('open', 'updated');
          });
        } else if (data.type === 'updated') {
          setTimeout(function () {
            element.removeAttribute('open');
          });
        } else if (data.type === 'removed') {
          assert(true);
          done();
        }
      }
    });

    helpers.fixture('<div id="attrtest" open="created"></div>');
  });

  it('should ensure an attribute exists before trying to action it just in case another attribute handler removes it', function () {
    skate('div', {
      attributes: function (element, data) {
        if (data.name === 'first') {
          element.removeAttribute('second');
        }
      }
    });

    document.body.innerHTML = '<div first="first" second="second"></div>';
    var div = skate.init(document.body.querySelector('div'));
    div.hasAttribute('first').should.equal(true);
    div.hasAttribute('second').should.equal(false);
  });

  it('should ensure attributes are initialised', function () {
    var called = false;
    skate('my-el', {
      attributes: function () {
        called = true;
      }
    });

    skate.init(helpers.fixture('<my-el some-attr></my-el>'));
    expect(called).to.equal(true);
  });

  it('should iterate over every attribute even if one removed while it is still being processed', function () {
    var attributesCalled = 0;
    skate('my-el', {
      attributes: {
        id: {
          created: function (element) {
            element.removeAttribute('id');
            attributesCalled++;
          }
        },
        name: {
          created: function (element) {
            element.removeAttribute('name');
            attributesCalled++;
          }
        }
      }
    });

    skate.init(helpers.fixture('<my-el id="test" name="name"></my-el>'));
    expect(attributesCalled).to.equal(2);
  });

  describe('should initialise default attribute values', function () {
    it('should set a default value using the "default" option', function () {
      var MyEl = skate('my-el', {
        attributes: {
          'aria-hidden': {
            default: 'true'
          }
        }
      });

      new MyEl().getAttribute('aria-hidden').should.equal('true');
    });

    it('should allow a callback to return a default value', function () {
      var MyEl = skate('my-el', {
        attributes: {
          'aria-hidden': {
            default: function (element) {
              return 'true';
            }
          }
        }
      });

      new MyEl().getAttribute('aria-hidden').should.equal('true');
    });
  });

  describe('should define properties for all watched attributes', function () {
    var myEl;

    beforeEach(function () {
      var MyEl = skate('my-el', {
        attributes: {
          'aria-hidden': {
            default: 'true'
          }
        }
      });

      myEl = new MyEl();
    });

    it('should set the attribute when the property is set', function () {
      myEl.setAttribute('aria-hidden', 'false');
      myEl.ariaHidden.should.equal('false');
    });

    it('should set the property when the attribute is set', function () {
      myEl.ariaHidden = 'true';
      myEl.getAttribute('aria-hidden').should.equal('true');
    });
  });
});
