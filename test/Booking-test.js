const chai = require('chai');
const expect = chai.expect;

import Booking from '../src/Booking';

let booking;

describe('Booking', () => {

    beforeEach(() => {
        // booking = new Booking()
    });
    it('should be a function', () => {
        expect(Booking).to.be.a('function');
      });
});