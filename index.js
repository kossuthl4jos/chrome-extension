const weatherElement = document.getElementById("weather");
const weatherIcon = document.getElementById("weather-icon");
const locationElement = document.getElementById("location");
async function getWeather() {
  try {
    const locationResponse = await fetch("https://ipapi.co/json/");
    const { city, latitude, longitude } = await locationResponse.json();
    locationElement.textContent = city;
    // https://open-meteo.com/en/docs
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`;
    const response = await fetch(url);
    const weatherData = await response.json();
    console.log(weatherData);

    weatherElement.textContent = `${Math.round(
      weatherData.current.temperature_2m
    )}°C`;
    weatherIcon.src = "icons/clear-sun.svg";
  } catch (error) {
    console.error("Error fetching weather data:", error);
    locationElement.textContent = "Error fetching weather";
  }
}

getWeather();

function updateTime() {
  const now = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedTime = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const currentTimeElement = document.getElementById("current-time");
  currentTimeElement.textContent = ` ${formattedTime}`;
  const formattedDate = now.toLocaleDateString("en-US", options);
  const currentDay = document.getElementById("current-day");
  currentDay.textContent = `${formattedDate} `;
}

setInterval(updateTime, 1000);
updateTime();

const quotes = [
  "The best way to get started is to quit talking and begin doing. - Walt Disney",
  "The pessimist sees difficulty in every opportunity. The optimist sees opportunity in every difficulty. - Winston Churchill",
  "Don’t let yesterday take up too much of today. - Will Rogers",
  "You learn more from failure than from success. Don’t let it stop you. Failure builds character. - Unknown",
  "It’s not whether you get knocked down, it’s whether you get up. - Vince Lombardi",
  "If you are working on something that you really care about, you don’t have to be pushed. The vision pulls you. - Steve Jobs",
  "People who are crazy enough to think they can change the world, are the ones who do. - Rob Siltanen",
  "Failure will never overtake me if my determination to succeed is strong enough. - Og Mandino",
  "Entrepreneurs are great at dealing with uncertainty and also very good at minimizing risk. That’s the classic entrepreneur. - Mohnish Pabrai",
  "We may encounter many defeats but we must not be defeated. - Maya Angelou",
];

function getQuote() {
  const quoteIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[quoteIndex];
  document.getElementById("random-quote").textContent = randomQuote;
}
getQuote();
