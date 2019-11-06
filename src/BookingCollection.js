import Booking from "./Booking";

class BookingCollection {
    constructor(bookings) {
        this.bookings = bookings
    }

    findBookedRoomNumbers(date) {
        let bookingsForDate = this.bookings.filter(booking => booking.date === date)
        return bookingsForDate.map(booking => booking.roomNumber)
    }

    findAllForCustomer(customerId) {
        return this.bookings.filter(booking => booking.userId === customerId)
    }
}
export default BookingCollection;
