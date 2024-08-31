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
