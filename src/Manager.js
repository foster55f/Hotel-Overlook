import User from './User';
import CustomerCollection from './CustomerCollection';


class Manager extends User {
    constructor(customers, bookings, rooms) {
        super(bookings, rooms)
        this.customerCollection = new CustomerCollection(customers)
    }

    findPercentageOccupied(date) {
        let bookedRoomNumbers = this.bookingCollection.findBookedRoomNumbers(date)
        return this.roomCollection.calculatePercentageOccupied(bookedRoomNumbers)
    }

    findTotalRevenueForToday() {
        let date = Date.now()
        let bookedRoomNumbers = this.bookingCollection.findBookedRoomNumbers(date)
        let rooms = this.roomCollection.findAllByNumbers(bookedRoomNumbers)
        return this.roomCollection.findRoomsRevenue(rooms)

    }
}
    
 export default Manager;