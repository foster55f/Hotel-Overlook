import $ from "jquery";

export default {
    displayCustomerInfo(customer) {
      $('.customer-bookings-title').attr('data-id', `${customer.id}`).text(`${customer.name}`)
      $('#manager-customer-data').show();
      $('#manager-customer-hotel-booking-info').show();
      this.clearCustomerResults()
      $('#customer-search').val('')
      $('.customer-bookings').text(`Number of Bookings: ${customer.findAllBookings().length}`)
      $('.customer-spending').text(`${customer.findTotalSpentOnRooms()}`)
    },

    displayRoomInfo(rooms) {
        $(".available-rooms").show(); 
        rooms.forEach(room => {
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
        $(".customer-bookings-filter").attr('data-id', `${room.number}`).text(`${room.number}`)
        // $(".customer-bookings-filter").attr('data-id', `${room.number}`).text(`${room.roomType}`)

    }
}

