import "./styles.css";
import { getData } from "./getData";
import { processData } from "./processData";
import { render, updateUnits } from "./render";

const form = document.querySelector("form");
updateUnits();

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const location = document.getElementById("location");
  let data = {};

  try {
    data = await getData(location.value);
  } catch (error) {
    console.log(error.message);
    return;
  }

  const weather = await processData(data);
  console.log(weather);
  render(weather);
});
