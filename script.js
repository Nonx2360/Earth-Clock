let clockInterval;

function displayClock() {
    const cityInput = document.getElementById('city').value.trim();
    const clockType = document.getElementById('clockType').value;
    const clockContainer = document.getElementById('clockContainer');

    clearInterval(clockInterval);
    clockContainer.innerHTML = '';

    if (clockType === 'digital') {
        createDigitalClock(cityInput, clockContainer);
    } else {
        createAnalogClock(cityInput, clockContainer);
    }
}

function createDigitalClock(city, container) {
    const clockDiv = document.createElement('div');
    clockDiv.id = 'digitalClock';
    container.appendChild(clockDiv);

    clockInterval = setInterval(() => {
        const time = new Date();
        const utcOffset = getUTCOffset(city); // Get the UTC offset
        const localTime = new Date(time.getTime() + utcOffset * 3600 * 1000); // Apply offset

        // Display the local time
        clockDiv.textContent = localTime.toLocaleTimeString('en-US', { timeZone: 'UTC' });
    }, 1000);
}

function createAnalogClock(city, container) {
    const clockDiv = document.createElement('div');
    clockDiv.id = 'analogClock';

    // Create hour markers without numbers
    const markers = Array.from({ length: 12 }); // Create an array with 12 elements
    markers.forEach((_, index) => {
        const markerDiv = document.createElement('div');
        markerDiv.classList.add('marker');
        const angle = index * 30; // 360 degrees / 12 hours = 30 degrees per hour
        markerDiv.style.transform = `rotate(${angle}deg) translate(100px) rotate(-${angle}deg)`;
        clockDiv.appendChild(markerDiv);
    });

    const hourHand = document.createElement('div');
    hourHand.id = 'hour';
    hourHand.classList.add('hand');

    const minuteHand = document.createElement('div');
    minuteHand.id = 'minute';
    minuteHand.classList.add('hand');

    const secondHand = document.createElement('div');
    secondHand.id = 'second';
    secondHand.classList.add('hand');

    clockDiv.appendChild(hourHand);
    clockDiv.appendChild(minuteHand);
    clockDiv.appendChild(secondHand);
    container.appendChild(clockDiv);

    clockInterval = setInterval(() => {
        const time = new Date();
        const utcOffset = getUTCOffset(city);
        const localTime = new Date(time.getTime() + utcOffset * 3600 * 1000);

        const seconds = localTime.getSeconds();
        const minutes = localTime.getMinutes();
        const hours = localTime.getHours() % 12; // Convert to 12-hour format

        hourHand.style.transform = `rotate(${hours * 30 + minutes / 2}deg)`;
        minuteHand.style.transform = `rotate(${minutes * 6}deg)`;
        secondHand.style.transform = `rotate(${seconds * 6}deg)`;
    }, 1000);
}

function getUTCOffset(city) {
    const timezoneOffsets = {
        'tokyo': 9,
        'new york': -4,
        'london': 0,
        'bangkok': 7,
        // Add more cities as needed
    };

    const cityLower = city.toLowerCase();

    // Check for predefined cities
    if (timezoneOffsets[cityLower]) {
        return timezoneOffsets[cityLower];
    }

    // Check if the input is in GMT format
    const gmtMatch = cityLower.match(/^gmt([+-]\d+)$/);
    if (gmtMatch) {
        return parseInt(gmtMatch[1]);
    }

    alert('City or timezone not found');
    return 0; // Default to UTC
}