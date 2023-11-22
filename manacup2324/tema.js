/*!
 * Color mode toggler for Bootstrap's docs (https://getbootstrap.com/)
 * Copyright 2011-2023 The Bootstrap Authors
 * Licensed under the Creative Commons Attribution 3.0 Unported License.
 */

(() => {
  "use strict";

  const getStoredTheme = () => localStorage.getItem("theme");
  const setStoredTheme = (theme) => localStorage.setItem("theme", theme);

  const getPreferredTheme = () => {
    const storedTheme = getStoredTheme();
    if (storedTheme) {
      return storedTheme;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  const setTheme = (theme) => {
    if (
      theme === "auto" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      document.documentElement.setAttribute("data-bs-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-bs-theme", theme);
    }
  };

  setTheme(getPreferredTheme());

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", () => {
      const storedTheme = getStoredTheme();
      if (storedTheme !== "light" && storedTheme !== "dark") {
        setTheme(getPreferredTheme());
      }
    });

  window.addEventListener("DOMContentLoaded", () => {
    var temaselector = document.getElementById("temaselector");
    temaselector.value = getPreferredTheme();
    temaselector.addEventListener("change", () => {
      const theme = temaselector.value;
      console.log(theme);
      setStoredTheme(theme);
      setTheme(theme);
    });
  });
})();
const getStoredPestanyes = () => localStorage.getItem("pestanyes");

const setStoredPestanyes = (opcio) => localStorage.setItem("pestanyes", opcio);

window.addEventListener("DOMContentLoaded", () => {
  var pestSelector = document.getElementById("pestanyes");
  pestSelector.checked = getStoredPestanyes
  if(getStoredPestanyes!="true"){
    console.log("amaga pestanyes")
    document.getElementById("collapsetabs").classList.add("collapse")
    document.getElementById("collapsetabs").classList.remove("show")
  }
  pestSelector.addEventListener("click", () => {
    pestSelector.checked == true
      ? setStoredPestanyes("true")
      : setStoredPestanyes("false");
  });
});
