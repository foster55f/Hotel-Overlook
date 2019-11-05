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
var customerCollection;


$('.login-button').on('click', function () {
    event.preventDefault();
    var user = $(".userName-input").val()
    var password = $(".userName-password").val()
    var id = user.slice(-2)
    localStorage.setItem('key',id)
    if (user === 'manager' && password === 'overlook2019') {
        window.location = "./manager-deck.html";
    } else if (user.includes('customer') && password === 'overlook2019' && user.length > 1){
        window.location = "./user-deck.html";
    }
});

$(".rooms-available-btn").on('click', function () {
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

// $(".customer-search-btn").on('click', function () {
//     var searchVal = $('#customer-search').val();
//     var customerNames = customers.findAllByName(searchVal)
//     if (customerNames.length === 0) {
//         domUpdates.noCustomersFound()
//     } else {
//         domUpdates.appendCustomerNames(customerNames)
//     }
//     $('#customer-search').val('')
// });

// $(".customer-results").on('click', function (e) {
//    let value = $('li').attr("data-id")
// });

// $(".book-room-btn").on('click', function (e) {
//     let datePicked = $(".date-picked").val();
//  });










