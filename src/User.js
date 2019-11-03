import BookingCollection from './BookingCollection';
import RoomCollection from './RoomCollection';


class User {
    constructor(bookings, rooms) {
        this.bookingCollection = new BookingCollection(bookings); 
        this.roomCollection = new RoomCollection(rooms);
    }

    findTotalRoomsAvailableForToday() {
        let date = Date.now();
        console.log(this.roomCollection)
        let bookedRoomNumbers = this.bookingCollection.bookedRoomNumbers(date);
        let roomsAvailable = this.roomCollection.findAvailableRooms(bookedRoomNumbers);
        return roomsAvailable
    }

    filterAvailableRoomsByType(roomType) {
        let availableRooms = this.findTotalRoomsAvailableForToday();
        return this.roomCollection.filterByRoomType(roomType, availableRooms)
    }
}


export default User;