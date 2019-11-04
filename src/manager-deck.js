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
    customerCollection = new CustomerCollection(userData);
    roomCollection = new RoomCollection(roomData);
    bookingCollection = new BookingCollection(bookingData);
}).then(() => {
    manager = new Manager(customerCollection, roomCollection, bookingCollection);
    console.log(manager.bookingCollection)
    $('.total-revenue').html(manager.findTotalRevenueForToday())
    $(".available-percentage").html(manager.findPercentageOccupied(Date.now()))
    $('.total-available-rooms').html(manager.findTotalRoomsAvailableForToday().length)
});