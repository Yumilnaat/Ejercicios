import axios from "axios";

const API_KEY = "883b9e4e3de04c68a88203947250104";
const CITY = "Mexico";
const URL = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${CITY}`;

axios.get(URL)
  .then(response => console.log("Datos del clima:", response.data))
  .catch(error => console.error("Error al obtener el clima:", error.response.data));
