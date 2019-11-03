const chai = require('chai');
const expect = chai.expect;
import BookingCollection from '../src/BookingCollection';



describe('BookingCollection', () => {

    beforeEach( () => {
        // bookingCollection = new BookingCollection()
    });

    it('should be a function', () => {
        expect(BookingCollection).to.be.a('function');
      });

});