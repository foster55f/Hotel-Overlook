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
    }
}

