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
  const temp = document.getElementById("temp");
  const feels = document.getElementById("feels");

  city.textContent = weather.resolvedAddress;
  temp.textContent = `Temperature: ${FtoC(weather.currentConditions.temp).toFixed(1)}${units}`;
  feels.textContent = `Feels like: ${FtoC(weather.currentConditions.feelslike).toFixed(1)}${units}`;

  unitButton.addEventListener("click", () => {
    temp.textContent = `Temperature: ${FtoC(weather.currentConditions.temp).toFixed(1)}${units}`;
    feels.textContent = `Feels like: ${FtoC(weather.currentConditions.feelslike).toFixed(1)}${units}`;
  });

  function FtoC(F) {
    if (units === "°F") {
      return F;
    }

    return (F - 32) * (5 / 9);
  }
}
