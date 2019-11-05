import $ from 'jquery';

import domUpdates from "./domUpdates";
import User from './User';
import Manager from './Manager';
import Booking from './Booking';
import BookingCollection from './BookingCollection';
import RoomCollection from './RoomCollection';
import CustomerCollection from './CustomerCollection';
import Customer from './Customer';
import Room from './Room';

import './css/base.scss';
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
    initDom()
  let rooms = roomData.map(roomInfo => new Room(roomInfo))
  let bookings = bookingData.map(bookingInfo => new Booking(bookingInfo))
  roomCollection = new RoomCollection(rooms);
  bookingCollection = new BookingCollection(bookings);
  let customers = userData.map(userInfo => new Customer(userInfo, roomCollection, bookingCollection))
  customerCollection = new CustomerCollection(customers);
}).then(() => {
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0');
var yyyy = today.getFullYear();
today = yyyy + '/' + mm + '/' + dd;
    manager = new Manager(customerCollection, roomCollection, bookingCollection);
    $('.total-revenue').html(manager.findTotalRevenueForDate(today))
    $(".available-percentage").html(manager.findPercentageOccupied(today))
    $('.total-available-rooms').html(manager.findTotalRoomsAvailableForDate(today).length)
});

function initDom() {
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
        let roomsAvailable = manager.findTotalRoomsAvailableForDate(datePicked)
        domUpdates.displayRoomInfo(roomsAvailable);
        $('.customer-bookings-title').attr("data-id")
        $(".reset-btn").attr("disabled", false);
    });

    $(".reset-btn").on('click', function () {
        location.reload();
    });
   
    
    $(".delete -id - button").on('click', function () {
        console.log('hii')
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
        domUpdates.appendRoomPicked(room)
        $(".book-room-btn").attr("disabled", false);
    });


    $('#customer-results-list').on('click', function (e) {
        let value = $(e.target).data("id")
        var datePicked = $(".date-picked").val();
        datePicked = datePicked.replace(/-/g, "/")
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();

        today = yyyy + '/' + mm + '/' + dd;
        let customer = manager.customerCollection.getUserData(parseInt(value))
        let customerBookings = customer.findAllBookings()
        
        let upComingReservations = manager.findUpcomingReservationsForCustomer(customer, today)
        domUpdates.displayCustomerInfo(customer);
        domUpdates.displayForManagerCustomerBookings(customer, customerBookings,upComingReservations)
    });

    $(".book-room-btn").on('click', function (e) {
        let userID = $('.customer-bookings-title').attr("data-id")
        var datePicked = $(".date-picked").val();
        datePicked = datePicked.replace(/-/g, "/")
        var roomNum = $(".customer-bookings-filter").attr('data-id')
        fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings', { method: 'Post', headers: { 'Content-Type': "application/json" }, body: JSON.stringify({ userID: parseInt(userID), date: datePicked, roomNumber: parseInt(roomNum) }) })
        alert("Thanks for your Reservation!!");
        $(".book-room-btn").attr("disabled", true);
    })
}