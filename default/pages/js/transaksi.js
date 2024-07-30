var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})

let tomorrow = new Date();
tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);

const elMSInterval = document.getElementById('msInterval');
elMSInterval.setAttribute('data-interval',tomorrow.getTime());
let msInterval = +elMSInterval.getAttribute('data-interval');

var x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = tomorrow - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  days = (+days < 10 ? "0" + days:days);
  hours = (+hours < 10 ? "0" + hours:hours);
  minutes = (+minutes < 10 ? "0" + minutes:minutes);
  seconds = (+seconds < 10 ? "0" + seconds:seconds);

  document.getElementById('countdowntimer').innerHTML = '';
  document.getElementById('countdowntimer').insertAdjacentHTML('beforeend','<span class="day">'+days+'</span>:<span class="hour">'+hours+'</span>:<span class="minute">'+minutes+'</span>:<span class="second">'+seconds+'</span>');

  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
      // document.getElementById("demo").innerHTML = "EXPIRED";
  }
}, 1000);