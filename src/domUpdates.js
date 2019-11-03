import $ from "jquery";

export default {

    appendCustomerNames(customers) {
        $('.customer-results').empty()
        customers.forEach(customer => {
            $('.customer-results').append($("<li>").attr('data-id', `${customer.id}`).text(customer.name));
        })
    },
    noCustomersFound() {
        $('.customer-results').empty()
        $('.customer-results').append('<p> No Customers Found</p>')
    }
}