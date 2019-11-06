import $ from 'jquery';

import domUpdates from "./domUpdates";
import BookingCollection from './BookingCollection';
import RoomCollection from './RoomCollection';
import CustomerCollection from './CustomerCollection';
import Customer from './Customer';
import Room from './Room';
import Booking from './Booking';

import './css/base.scss';
import './images/clouds-daylight-environment-462146.jpg'

var userData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users').then(response => response.json()).then(data => data.users);
let roomData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms').then(response => response.json()).then(data => data.rooms);
let bookingData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings').then(response => response.json()).then(data => data.bookings);
let customerCollection;
let roomCollection;
let bookingCollection;
let customer;
var today = formatTodaysDate()

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
    let id = localStorage.getItem('key')
    let currentUserData = customerCollection.getUserData(parseInt(id))
    customer = new Customer(currentUserData, roomCollection, bookingCollection);
    
    $('.welcome-user').text(`Welcome ${customer.name}`)
    $(".customer-bookings").html(customer.findAllBookings().length)
    let customerBookings= customer.findAllBookings()
    domUpdates.displayCustomerBookings(customer,customerBookings)
    $(".customer-spending").html(customer.findTotalSpentOnRooms())
    $('.available-rooms').hide();
});

function formatTodaysDate() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    return yyyy + '/' + mm + '/' + dd;
}

function getDatePicked() {
    let datePicked = $(".date-picked").val();
    return datePicked.replace(/-/g, "/")
}

$(".date-picked").on('change', function () {
    let datePicked = getDatePicked()
    let roomsAvailable = customer.findTotalRoomsAvailableForDate(datePicked)
    
    if (roomsAvailable.length === 0) {
        domUpdates.displayNoRoomsAvailable()
    } else {
        domUpdates.displayRoomInfo(roomsAvailable);
        $('.customer-bookings-title').attr("data-id")
        $(".reset-btn").attr("disabled", false);
        $('.selection').show();
    }
});

$('.selection').on('change', function () {
    $('#room-results-list').empty()
    var searchVal = $('.selection').val();
    let roomsByType = customer.filterAvailableRoomsByType(searchVal, today)
    domUpdates.displayRoomInfo(roomsByType);
});

$("#room-results-list").on('click', function (e) {
    let value = $(e.target).data("id")
    let room = roomCollection.findByNumber(value)
    domUpdates.appendRoomPicked(room)
    $(".book-room-btn").attr("disabled", false);
});

$(".reset-btn").on('click', function () {
    location.reload();
});

$(".book-room-btn").on('click', function (e) {
    let userID = customer.id
    let datePicked = getDatePicked()
    var roomNum = $(".customer-bookings-filter").attr('data-id')
    
    fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings', { method: 'Post', headers: { 'Content-Type': "application/json" }, body: JSON.stringify({ userID: parseInt(userID), date: datePicked, roomNumber: parseInt(roomNum) }) })
        .catch(data => console.log('There was error with your Reservation', data))
    
    alert("Thanks for your Reservation!!");
    location.reload();
    
    $(".book-room-btn").attr("disabled", true);
});