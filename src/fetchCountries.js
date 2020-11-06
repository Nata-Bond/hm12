import template from "./template.hbs";
import listTemplate from "./listCountries.hbs";

import { error } from "@pnotify/core";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";
import "../node_modules/@pnotify/core/dist/PNotify.css";
const countries = document.querySelector(".countries");

let baseUrl = `https://restcountries.eu/rest/v2/name/`;

function createItem(temp, data, place) {
  const item = temp(data);
  place.insertAdjacentHTML("afterbegin", item);
}
export default function fetchCountries(searchQuery) {
  countries.innerHTML = "";
  let url = `${baseUrl}${searchQuery}`;
  return fetch(url)
    .then((res) => {
      console.log(res);
      if (res.status > 200) {
        error({
          title: "Country not found",
          text: "Country not found",
          delay: 2000,
        });
      }
      return res.json();
    })
    .then((countriesList) => {
      if (countriesList.length > 10) {
        error({
          title: "Attention",
          text: "Too many matches found. Please enter a more specific query",
          delay: 2000,
        });
      }
      if (countriesList.length >= 2 && countriesList.length <= 10) {
        createItem(listTemplate, countriesList, countries);
      }
      if (countriesList.length === 1) {
        createItem(template, countriesList, countries);
      }
    })
    .catch((error) => console.log(error));
}
