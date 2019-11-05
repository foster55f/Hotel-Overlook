const chai = require('chai');
const expect = chai.expect;
import RoomCollection from '../src/RoomCollection';
import Room from '../src/Room';


let mockRooms;
let roomCollection;


describe('RoomCollection', () => {
    beforeEach( () => {
    mockRooms =[
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
    ]
      
      let rooms = mockRooms.map(mockRoom => new Room(mockRoom))
      console.log(rooms)
        
    roomCollection = new RoomCollection(rooms)
});

    it('should be a function', () => {
        expect(RoomCollection).to.be.a('function');
    });
// check for instance
    it('should have a list of rooms', () => {
        expect(roomCollection.rooms.length).to.eql([
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
        ]);
    });

    it('should find available rooms', () => {
        expect(roomCollection.findAvailableRooms([3,2,4])).to.eql([    {
            "number": 1,
            "roomType": "residential suite",
            "bidet": true,
            "bedSize": "queen",
            "numBeds": 1,
            "costPerNight": 358.4
        },
            {
            "number": 5,
            "roomType": "single room",
            "bidet": true,
            "bedSize": "queen",
            "numBeds": 2,
            "costPerNight": 340.17
        }, 
      ]);
    });

    it('should find rooms revenue', () => {
        expect(roomCollection.findRoomsRevenue(mockRooms)).to.equal('2096.53');
    });

    it('should calculate the percentage occupied', () => {
        expect(roomCollection.calculatePercentageOccupied([3,2,4])).to.equal(60);
    });

    it('filter by room type', () => {
        expect(roomCollection.filterByRoomType("single room", [    {
            "number": 1,
            "roomType": "residential suite",
            "bidet": true,
            "bedSize": "queen",
            "numBeds": 1,
            "costPerNight": 358.4
        },
            {
            "number": 5,
            "roomType": "single room",
            "bidet": true,
            "bedSize": "queen",
            "numBeds": 2,
            "costPerNight": 340.17
        }, 
      ] )).to.eql([{
        "number": 5,
        "roomType": "single room",
        "bidet": true,
        "bedSize": "queen",
        "numBeds": 2,
        "costPerNight": 340.17
        } 
     ]);
 });

    it('should be able to find all rooms by number', () => {
        expect(roomCollection.findAllByNumbers([3,2,4])).to.eql( [ {
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
          }]);
    });

    it('should be able to find a room by number', () => {
        expect(roomCollection.findByNumber(4)).to.eql( {
            "number": 4,
            "roomType": "single room",
            "bidet": false,
            "bedSize": "queen",
            "numBeds": 1,
            "costPerNight": 429.44
          });
    });
});