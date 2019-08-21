const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-one');
const messageTwo = document.querySelector('#message-two');
const sunriseTime = document.querySelector('#sunriseTime');
const sunsetTime = document.querySelector('#sunsetTime');

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const location = search.value;

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    sunriseTime.textContent = '';
    sunsetTime.textContent = '';

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = 'error: ' + data.error;
            } else {
                messageOne.textContent = data.address;
                messageTwo.textContent = data.forecast;
                sunriseTime.textContent = data.sunriseTime;
                sunsetTime.textContent = data.sunsetTime;
            }
        });
    });
});