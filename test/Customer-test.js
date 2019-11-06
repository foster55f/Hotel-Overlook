const chai = require('chai');
const expect = chai.expect;

import Customer from '../src/Customer';
import RoomCollection from '../src/RoomCollection';
import BookingCollection from '../src/BookingCollection';
import CustomerCollection from '../src/CustomerCollection';
import Booking from '../src/Booking';
import Room from '../src/Room';



let customer;
let mockUserData;
let roomCollection;
let mockBookingData;
let bookingCollection;
let mockRoomData;
let bookings;
let rooms;

describe('Customer', function () {
    beforeEach(() => {
        mockUserData = {
            "id": 1,
            "name": "Leatha Ullrich"
        },
            mockBookingData = [
                {
                    "id": 1572293130156,
                    "userID": 1,
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
                    "userID": 1,
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
                }
            ],

            mockRoomData= [
                {
                  "number": 1,
                  "roomType": "residential suite",
                  "bidet": true,
                  "bedSize": "queen",
                  "numBeds": 1,
                  "costPerNight": 358.4
                },
                {
                  "number": 2,
                  "roomType": "suite",
                  "bidet": false,
                  "bedSize": "full",
                  "numBeds": 2,
                  "costPerNight": 477.38
                },
            ]
    
            bookings = mockBookingData.map(bookingData => new Booking(bookingData));
            rooms = mockRoomData.map(roomData => new Room(roomData))
    
            bookingCollection = new BookingCollection(bookings)
            roomCollection = new RoomCollection(rooms)
            customer = new Customer(mockUserData, roomCollection, bookingCollection);
    });

    // check for instances of bookingCollection and CustomerCollection
    it('should be a function', () => {
        expect(Customer).to.be.a('function');
    });

    // it('should be an instance of bookingCollection', () => {
    //     expect(bookingCollection).to.be.an.instanceOf(Booking);
    // });
    
    // it('should be an instance of bookingCollection', () => {
    //     expect(roomCollection).to.be.an.instanceOf(Booking);
    //   });

    it('should find all bookings', () => {
        console.log(customer)
        expect(customer.findAllBookings().length).to.equal(2);
    });

    it('should find total spent on rooms', () => {
        expect(customer.findTotalSpentOnRooms()).to.equal('0.00');
    });

    it('should find total spent on rooms', () => {
        expect(customer.findTotalSpentOnRooms()).to.equal('0.00');
    });
});