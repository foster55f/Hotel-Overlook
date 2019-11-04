import User from './User';

class Customer extends User {
    constructor(userData, roomCollection, bookingCollection) {
        super(bookingCollection, roomCollection)
        this.id = userData.id;
        this.name = userData.name;

    }

    findAllBookings() {
        return this.bookingCollection.findAllForCustomer(this.id)
    }

    findTotalSpentOnRooms() {
        let customerBookings = this.findAllBookings();
        let customerRooms = customerBookings.map(booking => booking.roomNumber)
        let rooms = this.roomCollection.findAllByNumbers(customerRooms)
        return this.roomCollection.findRoomsRevenue(rooms)
    }
}
    
 export default Customer;