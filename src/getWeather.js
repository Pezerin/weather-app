export async function getWeather(location) {
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/?key=2Q49BJZWCEM8D8X4ZZ2EH4M68`,
    { mode: "cors" }
  );
  const weatherData = await response.json();
  console.log(weatherData);
}
