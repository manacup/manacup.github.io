<<<<<<< HEAD
import Autocomplete from "https://cdn.jsdelivr.net/gh/lekoala/bootstrap5-autocomplete@master/autocomplete.js";
const opts = {
  onSelectItem: (e) => {
    var jugadorTriat = e.value;
    jugadorDesat = dades.filter((j) => j.ID == jugadorTriat)[0];
    renderUserCard(jugadorDesat);
    if (isLocalStorageAvailable()) {
      // available
      localStorage.setItem("jugador", e.value);
    }
    if (document.getElementById("botoAssisteix") != null) {
      document.getElementById("botoAssisteix").classList.remove("d-none");
      document.getElementById("botoAssisteix2").classList.add("d-none");
    }
  },
};

// identify an element to observe
const elementToObserve = document.querySelector("#loaded");

// create a new instance of `MutationObserver` named `observer`,
// passing it a callback function
const observer = new MutationObserver(() => {
  document.querySelectorAll(".llistajugadorstrobada").forEach((list) => {
    new Autocomplete(list);
  });

  document.querySelectorAll(".llistajugadors").forEach((list) => {
    new Autocomplete(list, opts);
  });
});

// call `observe()` on that MutationObserver instance,
// passing it the element to observe, and the options object
observer.observe(elementToObserve, { subtree: true, childList: true });
console.log("observant...");
=======
import Autocomplete from "https://cdn.jsdelivr.net/gh/lekoala/bootstrap5-autocomplete@master/autocomplete.js";
const opts = {
  onSelectItem: (e) => {
    var jugadorTriat = e.value;
    jugadorDesat = dades.filter((j) => j.ID == jugadorTriat)[0];
    renderUserCard(jugadorDesat);
    if (isLocalStorageAvailable()) {
      // available
      localStorage.setItem("jugador", e.value);
    }
    if (document.getElementById("botoAssisteix") != null) {
      document.getElementById("botoAssisteix").classList.remove("d-none");
      document.getElementById("botoAssisteix2").classList.add("d-none");
    }
  },
};

// identify an element to observe
const elementToObserve = document.querySelector("#loaded");

// create a new instance of `MutationObserver` named `observer`,
// passing it a callback function
const observer = new MutationObserver(() => {
  document.querySelectorAll(".llistajugadorstrobada").forEach((list) => {
    new Autocomplete(list);
  });

  document.querySelectorAll(".llistajugadors").forEach((list) => {
    new Autocomplete(list, opts);
  });
});

// call `observe()` on that MutationObserver instance,
// passing it the element to observe, and the options object
observer.observe(elementToObserve, { subtree: true, childList: true });
console.log("observant...");
>>>>>>> fb121be910205e5f6ca7bef6a2a2d60db7ef3306
