const chai = require('chai');
const expect = chai.expect;

import Room from '../src/Room';

let mockRoomData;
let room;


describe('Room', () => {

    beforeEach(() => {
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
        room = new Room(mockRoomData[0])
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