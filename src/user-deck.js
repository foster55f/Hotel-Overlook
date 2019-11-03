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

let customerCollection;

var userData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users').then(response => response.json()).then(data => data.users);
// let roomData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms').then(response => response.json()).then(data => data.rooms);
// let bookingData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings').then(response => response.json()).then(data => data.bookings);

Promise.all([userData]).then((promise) => {
    userData = promise[0];
}).then(() => {
    customerCollection = new CustomerCollection(userData);
    manager = new Manager(customerCollection)
    user = new User()

    pageLoadAfterFetch();
});

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/clouds-daylight-environment-462146.jpg'

$(document).ready(function () {
    customerCollection = new CustomerCollection(userData);
    let id = localStorage.getItem('key')
    let currentUser = customerCollection.getUserData(parseInt(id))
    console.log(currentUser)
    $('.welcome-user').text(currentUser.name)
});