
class User {
    constructor(bookingCollection, roomCollection) {
        this.bookingCollection = bookingCollection
        this.roomCollection = roomCollection
    }

    findTotalRoomsAvailableForDate(date) {
        let bookedRoomNumbers = this.bookingCollection.findBookedRoomNumbers(date);
        let roomsAvailable = this.roomCollection.findAvailableRooms(bookedRoomNumbers);
        return roomsAvailable
    }

    filterAvailableRoomsByType(roomType, date) {
        let availableRooms = this.findTotalRoomsAvailableForDate(date);
        return this.roomCollection.filterByRoomType(roomType, availableRooms)
    }
}


export default User;