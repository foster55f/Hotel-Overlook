const chai = require('chai');
const expect = chai.expect;
import RoomCollection from '../src/RoomCollection';



describe('RoomCollection', () => {

    beforeEach( () => {
        // roomCollection = new RoomCollection()
    });

    it('should be a function', () => {
        expect(RoomCollection).to.be.a('function');
      });
});