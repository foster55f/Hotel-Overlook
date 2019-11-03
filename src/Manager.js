import User from './User';
import CustomerCollection from './CustomerCollection';


class Manager extends User {
    constructor(customerCollection) {
        super()
        this.customerCollection = customerCollection;
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