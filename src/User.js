
class User {
    constructor(bookingCollection, roomCollection) {
        this.bookingCollection = bookingCollection
        this.roomCollection = roomCollection
    }

    findTotalRoomsAvailableForToday(date) {
        let bookedRoomNumbers = this.bookingCollection.findBookedRoomNumbers(date);
        let roomsAvailable = this.roomCollection.findAvailableRooms(bookedRoomNumbers);
        return roomsAvailable
    }

    filterAvailableRoomsByType(roomType) {
        let availableRooms = this.findTotalRoomsAvailableForToday();
        return this.roomCollection.filterByRoomType(roomType, availableRooms)
    }
}


export default User;