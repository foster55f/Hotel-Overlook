const chai = require('chai');
const expect = chai.expect;

import Customer from '../src/Customer';


describe('Customer', function() {
    it('should be a function', () => {
        expect(Customer).to.be.a('function');
    });
});