const chai = require('chai');
const expect = chai.expect;
import BookingCollection from '../src/BookingCollection';
import Booking from '../src/Booking';


let mockBookingCollectionData;
let bookingCollection;


describe('BookingCollection', () => {

    beforeEach(() => {
        mockBookingCollectionData = [
            {
                "id": 1572293130156,
                "userID": 19,
                "date": "2019/11/06",
                "roomNumber": 18,
                "roomServiceCharges": [
                
                ]
            },
            {
                "id": 1572293130159,
                "userID": 21,
                "date": "2019/11/12",
                "roomNumber": 8,
                "roomServiceCharges": [
                
                ]
            },
            {
                "id": 1572293130159,
                "userID": 12,
                "date": "2019/10/29",
                "roomNumber": 10,
                "roomServiceCharges": [
                
                ]
            },
            {
                "id": 1572293130159,
                "userID": 27,
                "date": "2019/11/15",
                "roomNumber": 4,
                "roomServiceCharges": [
                
                ]
            },
            {
                "id": 1572293130160,
                "userID": 16,
                "date": "2019/11/06",
                "roomNumber": 7,
                "roomServiceCharges": [
                
                ]
            },
        ]
        let bookings = mockBookingCollectionData.map(booking => new Booking(booking)) 
        bookingCollection = new BookingCollection(bookings)
    });

    it('should be a function', () => {
        expect(BookingCollection).to.be.a('function');
    });

    it('should contain a booking collection', () => {
        expect(bookingCollection.bookings.length).to.eql(5);
    });

    it('should return the user"s average number of hours slept per day', () => {
        expect(bookingCollection.findBookedRoomNumbers("2019/11/06")).to.eql([18,7]);
    });
    
    it('should find all the bookings for a customer', () => {
        expect(bookingCollection.findAllForCustomer(19)).to.eql([{
            "id": 1572293130156,
            "userId": 19,
            "date": "2019/11/06",
            "roomNumber": 18,
            "roomServiceCharges": [
            
            ]
        },]);
      });
});