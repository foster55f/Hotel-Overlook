class Booking {
    constructor(bookingData) {
        this.date = bookingData.date;
        this.id = bookingData.id;
        this.userId = bookingData.userID;
        this.roomNumber = bookingData.roomNumber;
        this.roomServiceCharges = bookingData.roomServiceCharges;
    }
}

export default Booking;
