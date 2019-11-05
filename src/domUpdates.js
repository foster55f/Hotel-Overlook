import $ from "jquery";

export default {
  displayCustomerInfo(customer) {
    $('.customer-bookings-title').attr('data-id', `${customer.id}`).text(`${customer.name}`)
    $('#manager-customer-data').show();
    $('#manager-customer-hotel-booking-info').show();
    this.clearCustomerResults()
    $('#customer-search').val('')
    // $('.your-bookings').text(`Number of Bookings: ${customer.findAllBookings()}`)
    $('.customer-spending').text(`${customer.findTotalSpentOnRooms()}`)
  },

  displayRoomInfo(rooms) {
    $(".available-rooms").show();
    rooms.forEach(room => {
      $('#room-results-list').append($("<button></button>").attr('data-id', `${room.number}`).text(`Reserve ${room.number}`));
      $('#room-results-list').append($("<li>").attr('data-id', `${room.number}`).text(room.number));
      $('#room-results-list').append($("<li>").attr('data-id', `${room.number}`).text(`RoomType: ${room.roomType}`));
      $('#room-results-list').append($("<li>").attr('data-id', `${room.number}`).text(`BidetAvailable: ${room.bidetAvailable}`));
      $('#room-results-list').append($("<li>").attr('data-id', `${room.number}`).text(`BedSize: ${room.bedSize}`));
      $('#room-results-list').append($("<li>").attr('data-id', `${room.number}`).text(`Number of Beds: ${room.numBeds}`));
      $('#room-results-list').append($("<li>").attr('data-id', `${room.number}`).text(`Cost Per Night: ${room.costPerNight}`));
    })
  },

  clearCustomerResults() {
    $('#customer-results-list').empty()
  },

  appendCustomerNames(customers) {
    this.clearCustomerResults()
    customers.forEach(customer => {
      $('#customer-results-list').append($("<li>").attr('data-id', `${customer.id}`).text(customer.name));
    })
  },

  noCustomersFound() {
    this.clearCustomerResults()
    $('#customer-results-list').append('<li> No Customers Found </li>')
  },

  appendRoomPicked(room) {
    $(".customer-bookings-filter").append('<button> Keep Searching </button>')
      
    $(".customer-bookings-filter").attr('data-id', `${room.number}`).text(`Book Room # ${room.number}?`)
    // $(".customer-bookings-filter").attr('data-id', `${room.number}`).text(`${room.roomType}`)

  },

  displayCustomerBookings(customer, customerBookings) {
    $(".your-bookings").show();
    customerBookings.forEach(booking => {
      $('#bookings-list').append($("<li>").text(booking.date));
      $('#bookings-list').append($("<li>").text(booking.id));
      $('#bookings-list').append($("<li>").text(`Room: ${booking.roomNumber}`));
    })
  },
  
  displayForManagerCustomerBookings(customer, customerBookings, upcomingReservations) {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    today = yyyy + '/' + mm + '/' + dd;
    $(".your-bookings").show();
    upcomingReservations.forEach(booking => {
      // customerBookings.forEach(customerBooking => {
      //   if (customerBooking.id !== booking.id) {
      //     $('#bookings-list').append($("<li>").text(customerBooking.date));
      //     $('#bookings-list').append($("<li>").text(customerBooking.id));
      //     $('#bookings-list').append($("<li>").text(`Room: ${customerBooking.roomNumber}`));
      //   }
      // }) 
        $('#bookings-list').append($("<button class = delete-id-button></button>").attr('data-id', `${booking.id}`).text(`Delete Reservation for : ${booking.date}`));
        $('#bookings-list').append($("<li>").text(booking.date));
        $('#bookings-list').append($("<li>").text(booking.id));
        $('#bookings-list').append($("<li>").text(`Room: ${booking.roomNumber}`));
      })
  }
}

