

// An example of how you import jQuery into a JS file if you use jQuery in that file
import $ from 'jquery';

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

console.log('This is the JavaScript entry file - your code begins here.');

   
$('.login-button').on('click', function () {
    console.log('hiii')
    var user = $(".userName-input").val();
    console.log(user)
    if (user === 'manager') {
      window.location = "./manager-deck.html";
    } else {
      window.location = "./user-deck.html";
    }
  });
