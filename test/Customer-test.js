const chai = require('chai');
const expect = chai.expect;

import Customer from '../src/Customer';
import RoomCollection from '../src/RoomCollection';
import BookingCollection from '../src/BookingCollection';
import CustomerCollection from '../src/CustomerCollection';
import Booking from '../src/Booking';


let customer;
let mockUserData;
let roomCollection

// mockBookingCollectionData = [
//             {
//                 "id": 1572293130156,
//                 "userID": 1,
//                 "date": "2019/11/06",
//                 "roomNumber": 1,
//                 "roomServiceCharges": [
                
//                 ]
//             },
//             {
//                 "id": 1572293130159,
//                 "userID": 1,
//                 "date": "2019/11/12",
//                 "roomNumber": 2,
//                 "roomServiceCharges": [
                
//                 ]

                
//     mockRoomData =  {
//                       "number": 1,
//                       "roomType": "residential suite",
//                       "bidet": true,
//                       "bedSize": "queen",
//                       "numBeds": 1,
//                       "costPerNight": 358.4
//                     },
//                     {
//                       "number": 2,
//                       "roomType": "suite",
//                       "bidet": false,
//                       "bedSize": "full",
//                       "numBeds": 2,
//                       "costPerNight": 477.38
//     },

describe('Customer', function () {
    beforeEach(() => {
        mockUserData = [     {
            "id": 1,
            "name": "Leatha Ullrich"
        },
        ]
        // bookings = mockBookingData.map(bookingData = new Booking(bookingData)
        // rooms = mockRoomData.map(roomData = new Room(roomData)
    
        // bookingCollection = new BookingCollection(bookings)
        // roomCollection = new RoomCollection(rooms)
    
        // new Customer(mockRoomData, roomCollection, bookingCollection)
    });

    // check for instances of bookingCollection and CustomerCollection
    it('should be a function', () => {
        expect(Customer).to.be.a('function');
    });

    // it('should have an id', () => {
    //     console.log(customer)
    //     expect(customer.id).to.equal(1);
    // });
});