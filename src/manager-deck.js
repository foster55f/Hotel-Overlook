import $ from 'jquery';
import './css/base.scss';

import domUpdates from "./domUpdates";
import User from './User';
import Manager from './Manager';
import Booking from './Booking';
import BookingCollection from './BookingCollection';
import RoomCollection from './RoomCollection';
import CustomerCollection from './CustomerCollection';
import Customer from './Customer';
import Room from './Room';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/clouds-daylight-environment-462146.jpg'

var userData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users').then(response => response.json()).then(data => data.users);
let roomData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms').then(response => response.json()).then(data => data.rooms);
let bookingData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings').then(response => response.json()).then(data => data.bookings);
let manager;
let customerCollection;
let roomCollection;
let bookingCollection;

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
    $('.total-revenue').html(manager.findTotalRevenueForToday())
    $(".available-percentage").html(manager.findPercentageOccupied(Date.now()))
    $('.total-available-rooms').html(manager.findTotalRoomsAvailableForToday().length)
});

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
    var datePicked = $(".date-picked").val();
    datePicked = datePicked.replace(/-/g, "/")
    let roomsAvailable = manager.findTotalRoomsAvailableForToday(datePicked)
    domUpdates.displayRoomInfo(roomsAvailable);
    $('.customer-bookings-title').attr("data-id")
});

$('.selection').on('change', function () {
    $('#room-results-list').empty()
    var searchVal = $('.selection').val();
    let roomsByType = manager.filterAvailableRoomsByType(searchVal)
    domUpdates.displayRoomInfo(roomsByType); 
    let id = $(".room-results-list").attr("data-id")
});

$("#room-results-list").on('click', function (e) {  
    let value = $(e.target).data("id")
    let room = roomCollection.findByNumber(value)
    console.log(room)
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