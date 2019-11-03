const chai = require('chai');
const expect = chai.expect;

import Manager from '../src/Manager';


describe('Manager', function() {
    it('should be a function', () => {
        expect(Manager).to.be.a('function');
      });
  });