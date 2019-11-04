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

    // static loadFromData() {
    // return fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings')
    //     .then(response => response.json())
    //     .then(data => data.bookings.map(booking => new Booking(booking)))
    // }

}
export default BookingCollection;
