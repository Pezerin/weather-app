export async function getData(location) {
  const key = "2Q49BJZWCEM8D8X4ZZ2EH4M68";

  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/?key=${key}`,
    { mode: "cors" }
  );

  if (!response.ok) {
    throw new Error(`Data Error: ${response.status}`);
  }

  const weatherData = await response.json();

  return weatherData;
}
