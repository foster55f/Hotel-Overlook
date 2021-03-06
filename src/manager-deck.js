import $ from 'jquery';

import domUpdates from "./domUpdates";
import Manager from './Manager';
import Booking from './Booking';
import BookingCollection from './BookingCollection';
import RoomCollection from './RoomCollection';
import CustomerCollection from './CustomerCollection';
import Customer from './Customer';
import Room from './Room';

import './css/base.scss';
import './images/clouds-daylight-environment-462146.jpg'

let userData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users').then(response => response.json()).then(data => data.users);
let roomData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms').then(response => response.json()).then(data => data.rooms);
let bookingData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings').then(response => response.json()).then(data => data.bookings);
let manager;
let customerCollection;
let roomCollection;
let bookingCollection;
let today = formatTodaysDate()

Promise.all([userData, roomData, bookingData]).then((promise) => {
    userData = promise[0];
    roomData = promise[1];
    bookingData = promise[2];
}).then(() => {
    let rooms = roomData.map(roomInfo => new Room(roomInfo))
    let bookings = bookingData.map(bookingInfo => new Booking(bookingInfo))
    
    roomCollection = new RoomCollection(rooms);
    bookingCollection = new BookingCollection(bookings);
    
    let customers = userData.map(userInfo => new Customer(userInfo, roomCollection, bookingCollection))
    customerCollection = new CustomerCollection(customers);
}).then(() => {
    manager = new Manager(customerCollection, roomCollection, bookingCollection);
    let today = formatTodaysDate()

    $('.total-revenue').html(manager.findTotalRevenueForDate(today))
    $(".available-percentage").html(manager.findPercentageOccupied(today))
    $('.total-available-rooms').html(manager.findTotalRoomsAvailableForDate(today).length)
    $('.available-rooms').hide();
    $('.your-bookings').hide();
});

function formatTodaysDate() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    return yyyy + '/' + mm + '/' + dd;
}

function getDatePicked() {
    var datePicked = $(".date-picked").val();
    return datePicked.replace(/-/g, "/")
}

$('#customer-search').on('keyup', function () {
    var searchVal = $('#customer-search').val();
    var customers = manager.findCustomersByName(searchVal);
    domUpdates.clearCustomerResults()
    if (searchVal === '') return
    if (customers.length === 0) {
        domUpdates.noCustomersFound()
    } else {
        domUpdates.appendCustomerNames(customers)
    }
});

$(".date-picked").on('change', function () {
    $('.selection').show();
    $('.available-rooms').show();

    var datePicked = getDatePicked()
    let roomsAvailable = manager.findTotalRoomsAvailableForDate(datePicked)
    domUpdates.displayRoomInfo(roomsAvailable);
    $('.customer-bookings-title').attr("data-id")
    $(".reset-btn").attr("disabled", false);
});

$(".reset-btn").on('click', function () {
    location.reload();
});

$("#bookings-list").on('click', function (e) {
    if ($(e.target).hasClass('delete-id-button')) { 
        let id = $(e.target).data("id")
        fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings', {
            method: 'delete',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                id: id
            })
        }).catch(data => console.log('There was an error deleting Reservation', data))
        alert("Reservation Deleted!!");
        location.reload();
    }
});

$('.selection').on('change', function () {
    $('#room-results-list').empty()
    var searchVal = $('.selection').val();
    let roomsByType = manager.filterAvailableRoomsByType(searchVal, today)
    domUpdates.displayRoomInfo(roomsByType);
});

$("#room-results-list").on('click', function (e) {
    let value = $(e.target).data("id")
    let room = roomCollection.findByNumber(value)
    domUpdates.appendRoomPicked(room)
    $(".book-room-btn").attr("disabled", false);
});

$('#customer-results-list').on('click', function (e) {
    let value = $(e.target).data("id")
    let customer = manager.customerCollection.getUserData(parseInt(value))
    let customerBookings = customer.findAllBookings()
    let upComingReservations = manager.findUpcomingReservationsForCustomer(customer, today)
    
    domUpdates.displayForManagerCustomerBookings(customer, customerBookings, upComingReservations)
    domUpdates.displayCustomerInfo(customer);
});

$(".book-room-btn").on('click', function (e) {
    let userID = $('.customer-bookings-title').attr("data-id")
    let datePicked = getDatePicked()
    let roomNum = $(".customer-bookings-filter").attr('data-id')

    fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings',
        { method: 'Post', headers: { 'Content-Type': "application/json" }, body: JSON.stringify({ userID: parseInt(userID), date: datePicked, roomNumber: parseInt(roomNum) }) })
        .catch(data => console.log('There was error with your Booking Reservation', data))
    
    alert("Reservation complete!!");
    location.reload();

    $(".book-room-btn").attr("disabled", true);
})
