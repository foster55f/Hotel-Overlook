const chai = require('chai');
const expect = chai.expect;

import Manager from '../src/Manager';


describe('Manager', function () {
    beforeEach(() => {
        mockUserData = [{
            "id": 1,
            "name": "Leatha Ullrich"
        },
        ],
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
    
        bookingCollection = mockBookingData.map(bookingData => new Booking(bookingData));
        roomCollection = mockRoomData.map(roomData => new Room(roomData))
        new Manager(mockCustomerData, roomCollection, bookingCollection);
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