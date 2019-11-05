import User from './User';
import CustomerCollection from './CustomerCollection';


class Manager extends User {
    constructor(customerCollection,roomCollection,bookingCollection) {
        super(bookingCollection,roomCollection)
        this.customerCollection = customerCollection;
    }

    findPercentageOccupied(date) {
        let bookedRoomNumbers = this.bookingCollection.findBookedRoomNumbers(date)
        return this.roomCollection.calculatePercentageOccupied(bookedRoomNumbers)
    }

    findTotalRevenueForDate(date) {
        let bookedRoomNumbers = this.bookingCollection.findBookedRoomNumbers(date)
        let rooms = this.roomCollection.findAllByNumbers(bookedRoomNumbers)
        return this.roomCollection.findRoomsRevenue(rooms)

    }

    findCustomersByName(name) {
        return this.customerCollection.findAllByName(name)
    }
    
    findUpcomingReservationsForCustomer(customer, date) {
        let customerBookings = customer.findAllBookings()
        return customerBookings.filter(booking => booking.date > date)
    }
}
    
 export default Manager;