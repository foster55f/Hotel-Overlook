const chai = require('chai');
const expect = chai.expect;

import Manager from '../src/Manager';
import BookingCollection from '../src/BookingCollection';
import CustomerCollection from '../src/CustomerCollection';

let mockUserData;
let mockBookingData

describe.only('Manager', function () {
    beforeEach(() => {
        mockUserData = [{
            "id": 1,
            "name": "Leatha Ullrich"
        },
        ],
            mockBookingData = [
                {
                    "id": 1572293130156,
                    "userID": 1,
                    "date": "2019/11/06",
                    "roomNumber": 1,
                    "roomServiceCharges": []
                },
                {
                    "id": 1572293130159,
                    "userID": 1,
                    "date": "2019/11/12",
                    "roomNumber": 2,
                    "roomServiceCharges": []
                },
                {
                    "id": 1572293130159,
                    "userID": 1,
                    "date": "2019/11/15",
                    "roomNumber": 1,
                    "roomServiceCharges": []
                },
                {
                    "id": 1572293130159,
                    "userID": 27,
                    "date": "2019/11/15",
                    "roomNumber": 2,
                    "roomServiceCharges": []
                },
                {
                    "id": 1572293130160,
                    "userID": 16,
                    "date": "2019/11/06",
                    "roomNumber": 1,
                    "roomServiceCharges": []
                }
            ],

            mockRoomData= [
                {
                  "number": 1,
                  "roomType": "residential suite",
                  "bidet": true,
                  "bedSize": "queen",
                  "numBeds": 1,
                  "costPerNight": 300.0
                },
                {
                  "number": 2,
                  "roomType": "suite",
                  "bidet": false,
                  "bedSize": "full",
                  "numBeds": 2,
                  "costPerNight": 400.38
                },
            ]
    
        
        bookings = mockBookingData.map(bookingData => new Booking(bookingData));
        rooms = mockRoomData.map(roomData => new Room(roomData))

        bookingCollection = new BookingCollection(bookings)
        roomCollection = new RoomCollection(rooms)

        customers = mockCustomerData.map(customerData => new Customer(customerData, roomCollection, bookingCollection))
        customerCollection = new CustomerCollection(customers)

        new Manager(customerCollection, roomCollection, bookingCollection);
    });
    it('should be a function', () => {
        expect(Manager).to.be.a('function');
    });

    it('should be an instance of bookingCollection', () => {
        expect(bookingCollection).to.be.an.instanceOf(Booking);
    });
    
    it('should be an instance of bookingCollection', () => {
        expect(roomCollection).to.be.an.instanceOf(Booking);
      });
  });