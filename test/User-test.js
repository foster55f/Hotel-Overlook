const chai = require('chai');
const expect = chai.expect;

import User from '../src/User';


describe('User', function() {
    it('should be a function', () => {
        expect(User).to.be.a('function');
    });
});