import $ from 'jquery';
import './css/base.scss';

import domUpdates from "./domUpdates";
import User from './User';
import Manager from './Manager';
import BookingCollection from './BookingCollection';
import RoomCollection from './RoomCollection';
import CustomerCollection from './CustomerCollection';
import Customer from './Customer';
import Room from './Room';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/clouds-daylight-environment-462146.jpg'
import { SlowBuffer } from 'buffer';

var userData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users').then(response => response.json()).then(data => data.users);
let roomData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms').then(response => response.json()).then(data => data.rooms);
let bookingData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings').then(response => response.json()).then(data => data.bookings);
let manager;
let customerCollection;
let roomCollection;
let bookingCollection;
let customer;

Promise.all([userData, roomData, bookingData]).then((promise) => {
    userData = promise[0];
    roomData = promise[1];
    bookingData = promise[2];
}).then(() => {
    customerCollection = new CustomerCollection(userData);
    roomCollection = new RoomCollection(roomData);
    bookingCollection = new BookingCollection(bookingData);
}).then(() => {
    let id = localStorage.getItem('key')
    let currentUserData = customerCollection.getUserData(parseInt(id))
    customer = new Customer(currentUserData, roomCollection, bookingCollection);
    $('.welcome-user').text(`Welcome ${customer.name}`)
    $(".customer-bookings").html(customer.findAllBookings().length)
    $(".customer-spending").html(customer.findTotalSpentOnRooms())
    // $('.total-available-rooms').html(manager.findTotalRoomsAvailableForToday().length)
    // pageLoadAfterFetch()
});

$(".date-picked").on('change', function () {
    $('.selection').show();
    var datePicked = $(".date-picked").val();
    datePicked = datePicked.replace(/-/g, "/")
    let roomsAvailable = customer.findTotalRoomsAvailableForToday(datePicked)
    domUpdates.displayRoomInfo(roomsAvailable);
    $('.customer-bookings-title').attr("data-id")
});

$('.selection').on('change', function () {
    $('#room-results-list').empty()
    var searchVal = $('.selection').val();
    let roomsByType = customer.filterAvailableRoomsByType(searchVal)
    domUpdates.displayRoomInfo(roomsByType); 
    let id = $(".room-results-list").attr("data-id")
});

$("#room-results-list").on('click', function (e) {  
    let value = $(e.target).data("id")
    let room = roomCollection.findByNumber(value)
    domUpdates.appendRoomPicked(room) 
});


$('#customer-results-list').on('click', function (e) {  
    let value = $(e.target).data("id")
    var datePicked = $(".date-picked").val();
    datePicked = datePicked.replace(/-/g, "/")
    let customer = manager.customerCollection.getUserData(parseInt(value))
    domUpdates.displayCustomerInfo(customer);
});

$(".book-room-btn").on('click', function (e) {
  let userID = $('.customer-bookings-title').attr("data-id")
  var datePicked = $(".date-picked").val();
    datePicked = datePicked.replace(/-/g, "/")
    var roomNum = $(".customer-bookings-filter").attr('data-id')
    fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings', { method:'Post',headers:{'Content-Type': "application/json"}, body:JSON.stringify({userID:parseInt(userID), date:datePicked, roomNumber:parseInt(roomNum)})})
 });