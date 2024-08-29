export function render(weather) {
  const city = document.getElementById("city");
  const temp = document.getElementById("temp");
  const feels = document.getElementById("feels");

  city.textContent = weather.resolvedAddress;
  temp.textContent = `Temperature: ${weather.currentConditions.temp}°F`;
  feels.textContent = `Feels like: ${weather.currentConditions.feelslike}°F`;
}
