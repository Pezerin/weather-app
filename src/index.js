import "./styles.css";
import { getData } from "./getData";
import { processData } from "./processData";

const form = document.querySelector("form");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const location = document.getElementById("location");
  const data = await getData(location.value);
  const weather = await processData(data);
  console.log(weather);
});
