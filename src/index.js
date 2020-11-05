import css from "./css/style.css";

import fetchCountries from "./fetchCountries.js";

import debounce from "lodash.debounce";

const input = document.getElementById("searchInput");

input.addEventListener(
  "input",
  debounce((e) => {
    fetchCountries(e.target.value);
  }, 700)
);
