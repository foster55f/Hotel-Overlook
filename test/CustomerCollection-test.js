const chai = require('chai');
const expect = chai.expect;
import CustomerCollection from '../src/CustomerCollection';

let mockCustomerData;
let customerCollection


describe('CustomerCollection', () => {
    beforeEach(() => {
        mockCustomerData = [
                {
                    "id": 1,
                    "name": "Leatha Ullrich"
                },
                {
                    "id": 2,
                    "name": "Rocio Schuster"
                },
                {
                    "id": 3,
                    "name": "Kelvin Schiller"
                },
                {
                    "id": 4,
                    "name": "Kennedi Emard"
                },
                {
                    "id": 5,
                    "name": "Rhiannon Little"
                },
        ]
        
        customerCollection = new CustomerCollection(mockCustomerData)
    });

    it('should be a function', () => {
        expect(CustomerCollection).to.be.a('function');
    });

    it('should have a list of customers', () => {
        expect(customerCollection.customers).to.eql([
            {
                "id": 1,
                "name": "Leatha Ullrich"
            },
            {
                "id": 2,
                "name": "Rocio Schuster"
            },
            {
                "id": 3,
                "name": "Kelvin Schiller"
            },
            {
                "id": 4,
                "name": "Kennedi Emard"
            },
            {
                "id": 5,
                "name": "Rhiannon Little"
            },
    ]);
    });

    it('should return the user"s average number of hours slept per day', () => {
        expect(customerCollection.findAllByName("Rhiannon Little")).to.eql([ { id: 5, name: 'Rhiannon Little'} ]);
    });

    it('should return the user"s data', () => {
        expect(customerCollection.getUserData(5)).to.eql({ id: 5, name: 'Rhiannon Little'});
    });
});