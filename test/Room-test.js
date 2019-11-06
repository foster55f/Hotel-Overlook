const chai = require('chai');
const expect = chai.expect;

import Room from '../src/Room';

let mockRoomData;
let room;


describe('Room', () => {

    beforeEach(() => {
        mockRoomData=  
            {
              "number": 1,
              "roomType": "residential suite",
              "bidet": true,
              "bedSize": "queen",
              "numBeds": 1,
              "costPerNight": 358.4
            },
          
        room = new Room(mockRoomData)
    });

    it('should be a function', () => {
        expect(Room).to.be.a('function');
    });

    it('should have a number', () => {
        expect(room.number).to.equal(1);
    });

    it('should have a roomType', () => {
        expect(room.roomType).to.equal("residential suite");
    });

    it('should have a bidetAvailability', () => {
        expect(room.bidetAvailable).to.equal(true);
    });

    it('should have a bedSize', () => {
        expect(room.bedSize).to.equal("queen");
    });

    it('should have a number of beds', () => {
        expect(room.numBeds).to.equal(1);
    });

    it('should have a cost per night', () => {
        expect(room.costPerNight).to.equal(358.4);
    });
});