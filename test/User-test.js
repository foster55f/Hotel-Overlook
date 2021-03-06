const chai = require('chai');
const expect = chai.expect;

import User from '../src/User';
import BookingCollection from '../src/BookingCollection';
import RoomCollection from '../src/BookingCollection';
import Booking from '../src/Booking';
import Room from '../src/Room';






let user;



describe('User', function () {
    beforeEach(() => {
        mockBookingData = [
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
            {
              "number": 3,
              "roomType": "single room",
              "bidet": false,
              "bedSize": "king",
              "numBeds": 1,
              "costPerNight": 491.14
            },
            {
              "number": 4,
              "roomType": "single room",
              "bidet": false,
              "bedSize": "queen",
              "numBeds": 1,
              "costPerNight": 429.44
            },
            {
              "number": 5,
              "roomType": "single room",
              "bidet": true,
              "bedSize": "queen",
              "numBeds": 2,
              "costPerNight": 340.17
            },
            {
              "number": 6,
              "roomType": "junior suite",
              "bidet": true,
              "bedSize": "queen",
              "numBeds": 1,
              "costPerNight": 397.02
            },
        ]
        bookings = mockBookingData.map(bookingData => new Booking(bookingData));
        rooms = mockRoomData.map(roomData => new Room(roomData))

        bookingCollection = new BookingCollection(bookings)
        roomCollection = new RoomCollection(rooms)

        user = new User(bookingCollection, roomCollection)
    });
    it('should be a function', () => {
        expect(User).to.be.a('function');
    });

    it('should have a bookingCollection', () => {
        expect(user.bookingCollection).to.equal(mockBookingData);
    });

    it('should have a roomCollection', () => {
        expect(user.roomCollection).to.equal(mockRoomData);
    });
});