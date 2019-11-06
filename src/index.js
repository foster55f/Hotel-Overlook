import $ from 'jquery';
import './css/base.scss';
import './images/clouds-daylight-environment-462146.jpg'

$('.login-button').on('click', function () {
    event.preventDefault();
    var user = $(".userName-input").val()
    var password = $(".userName-password").val()
    var id = user.replace('customer', '')
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










