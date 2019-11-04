const chai = require('chai');
const expect = chai.expect;

import Room from '../src/Room';


describe('Room', () => {

    beforeEach( () => {
        // room = new Room()
    });

    it('should be a function', () => {
        expect(Room).to.be.a('function');
    });
});