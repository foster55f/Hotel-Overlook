// An example of how you import jQuery into a JS file if you use jQuery in that file
import $ from 'jquery';
import domUpdates from "./domUpdates";
import User from './User';
import Manager from './Manager';
import BookingCollection from './BookingCollection';
import RoomCollection from './RoomCollection';
import CustomerCollection from './CustomerCollection';
import Customer from './Customer';
import Room from './Room';




// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/clouds-daylight-environment-462146.jpg'
import Booking from './Booking';


var user;
var customers
var booking;
var room;
var manager;
var BookingCollection;
var roomCollection;


var userData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users').then(response => response.json()).then(data => data.users);
let roomData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms').then(response => response.json()).then(data => data.rooms);
let bookingData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings').then(response => response.json()).then(data => data.bookings);

// Promise.all([userData, roomData, bookingData]).then((promise) => {
//     userData = promise[0];
//     roomData = promise[1];
//     bookingData = promise[2];
// }).then(() => {
//     user = new User(bookingData, roomData);   
//     customers = new CustomerCollection(userData);
//     console.log(userData)
    // roomCollection = new RoomCollection();
    // manager = new Manager(userData);
    // customer = new Customer(userData);
    // bookingCollection = new BookingCollection();
    // customerCollection = new CustomerCollection(userData)
    pageLoadAfterFetch();
  });

// $(".room1").text(`Total Rooms Available Today: ${user.findTotalRoomsAvailableForToday()}`);
// $(".room2").text(`Total Rooms Available Today: ${user.findTotalRoomsAvailableForToday()}`);

// $(document).ready(function () {
//     roomCollection = new RoomCollection();
// });

function pageLoadAfterFetch() {
    let id = localStorage.getItem('key')
    console.log(id)
    let currentUser = customers.getUserData(parseInt(id))
    $('.welcome-user').text(currentUser.name)
  }
  

$('.login-button').on('click', function () {
    var user = $(".userName-input").val()
    var password = $(".userName-password").val()
    var id = user.slice(-2)
    localStorage.setItem('key',id)
    if (user === 'manager' && password === '') {
        console
      window.location = "./manager-deck.html";
    } else {
        window.location = "./user-deck.html";
    }
});

$(".rooms-available-btn").on('click', function () {
    console.log(user.findTotalRoomsAvailableForToday())
    $(".room1").toggle()
    $(".room2").hide()
});

$(".revenue-btn").on('click', function () {
    $(".room2").toggle()
    $(".room1").hide()
    $(".room3").hide()

});

$(".rooms-occupied-btn").on('click', function () {
    $(".room3").toggle()
    $(".room1").hide()
    $(".room2").hide()
});

$(".customer-search-btn").on('click', function () {
    customers = new CustomerCollection(userData);
    var searchVal = $('#customer-search').val();
    var customerNames = customers.findAllByName(searchVal)
    if (customerNames.length === 0) {
        domUpdates.noCustomersFound()
    } else {
        domUpdates.appendCustomerNames(customerNames)
    }
    $('#customer-search').val('')
});

$(".customer-results").on('click', function (e) {
   let value = $('li').attr("data-id")
    console.log('hii')
    console.log(value)
});

$(".book-room-btn").on('click', function (e) {
    let datePicked = $(".date-picked").val();
    console.log(datePicked)
 });










