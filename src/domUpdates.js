import $ from "jquery";

export default {
  displayCustomerInfo(customer) {
    $('.customer-bookings-title').attr('data-id', `${customer.id}`).text(`${customer.name}`)
    $('#manager-customer-data').show();
    $('#manager-customer-hotel-booking-info').show();
    this.clearCustomerResults()
    $('#customer-search').val('')
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
  },

  displayCustomerBookings(customer, customerBookings) {
    $(".your-bookings").show();
    customerBookings.forEach(booking => {
      $('#bookings-list').append($("<li>").text(booking.date));
      $('#bookings-list').append($("<li class=last-li>").text(`Room: ${booking.roomNumber}`));

    })
  },

  displayNoRoomsAvailable() {
    $(".available-rooms").show();
    $(".available-rooms").attr('id', 'no-rooms-available').text("No Rooms Available Please Adjust Search");
  },
  
  displayForManagerCustomerBookings(customer, customerBookings, upcomingReservations) {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    today = yyyy + '/' + mm + '/' + dd;
    let upcomingBookingIds = upcomingReservations.map(booking => booking.id)
    $(".your-bookings").show();
    $('#bookings-list').empty()
    customerBookings.forEach(booking => {
      if (upcomingBookingIds.includes(booking.id)) {
        $('#bookings-list').append($("<button class = delete-id-button></button>").attr('data-id', `${booking.id}`).text(`Delete Reservation for : ${booking.date}`));
      }
      $('#bookings-list').append($("<li>").text(booking.date));
      $('#bookings-list').append($("<li>").text(booking.id));
      $('#bookings-list').append($("<li class=last-li>").text(`Room: ${booking.roomNumber}`));     
    })
  }
}

