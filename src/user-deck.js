import $ from 'jquery';

import domUpdates from "./domUpdates";
import User from './User';
import Manager from './Manager';
import BookingCollection from './BookingCollection';
import RoomCollection from './RoomCollection';
import CustomerCollection from './CustomerCollection';
import Customer from './Customer';
import Room from './Room';
import Booking from './Booking';

import './css/base.scss';

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
let bookings;
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0');
var yyyy = today.getFullYear();

today = yyyy + '/' + mm + '/' + dd;

Promise.all([userData, roomData, bookingData]).then((promise) => {
    userData = promise[0];
    roomData = promise[1];
    bookingData = promise[2];
}).then(() => {
    initDom()
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

function initDom() {
    $(".date-picked").on('change', function () {
        var datePicked = $(".date-picked").val();
        datePicked = datePicked.replace(/-/g, "/")
        // let roomsAvailable = customer.findTotalRoomsAvailableForDate(datePicked)
        let roomsAvailable = []
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
        let id = $(".room-results-list").attr("data-id")
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
        var datePicked = $(".date-picked").val();
        datePicked = datePicked.replace(/-/g, "/")
        var roomNum = $(".customer-bookings-filter").attr('data-id')
        fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings', { method: 'Post', headers: { 'Content-Type': "application/json" }, body: JSON.stringify({ userID: parseInt(userID), date: datePicked, roomNumber: parseInt(roomNum) }) })
            .catch(data => console.log('There was error with your Reservation', data))
        alert("Thanks for your Reservation!!");
        location.reload();
        $(".book-room-btn").attr("disabled", true);
    });
}