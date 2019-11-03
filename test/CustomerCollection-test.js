const chai = require('chai');
const expect = chai.expect;
import CustomerCollection from '../src/CustomerCollection';



describe('CustomerCollection', () => {

    beforeEach( () => {
        // CustomerCollection = new CustomerCollection()
    });

    it('should be a function', () => {
        expect(CustomerCollection).to.be.a('function');
      });

});