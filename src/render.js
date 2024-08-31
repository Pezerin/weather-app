import { parseISO, format } from "date-fns";

let units = "°F";
const unitButton = document.getElementById("units");

export function updateUnits() {
  unitButton.innerHTML = `Units: ${units}`;

  unitButton.addEventListener("click", () => {
    if (units === "°F") {
      units = "°C";
    } else {
      units = "°F";
    }
    unitButton.innerHTML = `Units: ${units}`;
  });
}

export function render(weather) {
  const city = document.getElementById("city");
  const date = document.getElementById("date");
  const temp = document.getElementById("temp");
  const feels = document.getElementById("feels");
  const desc = document.getElementById("desc");
  const icon = document.getElementById("current-icon");
  const forecast = document.getElementById("forecast");

  city.textContent = weather.resolvedAddress;

  const rawDate = parseISO(weather.days[0].datetime);
  const formattedDate = format(rawDate, "EEEE, MMMM d, yyyy");
  date.textContent = formattedDate;

  temp.textContent = `${FtoC(weather.currentConditions.temp).toFixed(1)}${units}`;
  feels.textContent = `Feels like: ${FtoC(weather.currentConditions.feelslike).toFixed(1)}${units}`;
  desc.textContent = weather.description;

  loadIcon(weather.currentConditions.icon).then((iconPath) => {
    icon.src = iconPath;
  });

  forecast.innerHTML = "";

  for (let i = 1; i < 7; i++) {
    const day = weather.days[i];

    const div = document.createElement("div");
    div.classList.add("day");

    const date = document.createElement("h3");
    date.id = "forecast-date";
    const rawDate = parseISO(day.datetime);
    const formattedDate = format(rawDate, "EEE, MMM d");
    date.textContent = formattedDate;

    const icon = document.createElement("img");
    icon.id = "forecast-icon";
    loadIcon(weather.currentConditions.icon).then((iconPath) => {
      icon.src = iconPath;
      icon.height = 35;
    });

    const rain = document.createElement("div");
    rain.id = "rain";

    const precipprob = document.createElement("h3");
    precipprob.textContent = `${day.precipprob}%`;

    const water = document.createElement("img");
    loadIcon("water").then((iconPath) => {
      water.src = iconPath;
      water.height = 35;
    });

    rain.append(precipprob, water);

    const lowHigh = document.createElement("h3");
    lowHigh.id = "low-high";
    lowHigh.textContent = `${FtoC(day.tempmin).toFixed(1)}${units} / ${FtoC(day.tempmax).toFixed(1)}${units}`;
    unitButton.addEventListener("click", () => {
      lowHigh.textContent = `${FtoC(day.tempmin).toFixed(1)}${units} / ${FtoC(day.tempmax).toFixed(1)}${units}`;
    });

    div.append(date, icon, rain, lowHigh);
    forecast.appendChild(div);
  }

  unitButton.addEventListener("click", () => {
    temp.textContent = `${FtoC(weather.currentConditions.temp).toFixed(1)}${units}`;
    feels.textContent = `Feels like: ${FtoC(weather.currentConditions.feelslike).toFixed(1)}${units}`;
  });

  function FtoC(F) {
    if (units === "°F") {
      return F;
    }

    return (F - 32) * (5 / 9);
  }
}

async function loadIcon(iconName) {
  try {
    const iconModule = await import(`./icons/${iconName}.svg`);
    return iconModule.default;
  } catch (error) {
    console.log("Error loading icon:", error.message);
  }
}
