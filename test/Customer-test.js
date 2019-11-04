const chai = require('chai');
const expect = chai.expect;

import Customer from '../src/Customer';
import RoomCollection from '../src/RoomCollection';


let customer;
let mockUserData;
let roomCollection


describe('Customer', function () {
    beforeEach(() => {
        mockUserData = [     {
            "id": 1,
            "name": "Leatha Ullrich"
        },
        ]
        
        customer = new Customer(mockUserData)
    });

    it('should be a function', () => {
        expect(Customer).to.be.a('function');
    });

    // it('should have an id', () => {
    //     console.log(customer)
    //     expect(customer.id).to.equal(1);
    // });
});