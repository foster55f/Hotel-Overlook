const chai = require('chai');
const expect = chai.expect;

import Booking from '../src/Booking';


let mockBookingData
let booking;

describe('Booking', () => {

    beforeEach(() => {
        mockBookingData = 
            {
                "id": 1572293130156,
                "userID": 19,
                "date": "2019/11/06",
                "roomNumber": 18,
                "roomServiceCharges": [
                
                ]
            }
        
            booking = new Booking(mockBookingData)
    });
    it('should be a function', () => {
        expect(Booking).to.be.a('function');
    });

    it('should have a date', () => {
        expect(booking.date).to.equal("2019/11/06");
    });
    
    it('should have an id', () => {
        expect(booking.id).to.equal(1572293130156);
    });
    
    it('should have a id', () => {
        expect(booking.id).to.equal(1572293130156);
    });
    
    it('should have a userId', () => {
        expect(booking.userId).to.equal(19);
    });
    
    it('should have a roomNumber', () => {
        expect(booking.roomNumber).to.equal(18);
    });
    
    it('should have a roomServiceCharges property', () => {
        expect(booking.roomServiceCharges).to.eql([]);
      });
});