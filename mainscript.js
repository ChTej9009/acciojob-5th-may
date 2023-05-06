const getLocationBtn = document.getElementById("getD");
const removeLocationBtn = document.getElementById("remove");
const mapDiv = document.getElementById("map");
const getLatitude = document.getElementById("lat");
const getLongitude = document.getElementById("long");
const locDiv = document.getElementById("loc");
const searchInput = document.getElementById("search");
const cardDiv = document.querySelector(".card");

function getLocation() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    mapDiv.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude; 
  localStorage.setItem("lat", latitude);
  localStorage.setItem("long", longitude);
  getLatitude.textContent = latitude;
  getLongitude.textContent = longitude;
 
  displayMap(latitude,longitude);
  locDiv.style.display = "block";
  getLocationBtn.style.display = "none";
}

function displayMap(latitude,longitude) {
    const mapUrl = `https://maps.google.com/maps?q=${latitude},${longitude}&key=AIzaSyDPK7mEk3j6E2ESdkA0oehDTePq2Ufhlhc&z=15&output=embed`;
}

function removeLocation() {
  localStorage.removeItem("lat");
  localStorage.removeItem("long");
  getLatitude.textContent = ``;
  getLongitude.textContent = ``;
  mapDiv.setAttribute("src", "");
  locDiv.style.display = "none";
  searchInput.value = "";
  cardDiv.style.display = "none";
}

// Check if lat and long already exist in local storage
const lat = localStorage.getItem("lat");
const long = localStorage.getItem("long");
if (lat && long) {
  displayMap(lat, long);
  locDiv.style.display = "block";
  getLocationBtn.style.display = "none";
  getLatitude.textContent = lat;
  getLongitude.textContent = long;
}

// Add event listeners
getLocationBtn.addEventListener("click", getLocation);
removeLocationBtn.addEventListener("click", removeLocation);
searchInput.addEventListener("input", function(event) {
  const filter = event.target.value.toLowerCase();
  const cards = document.querySelectorAll(".card");
  cards.forEach(function(card) {
    const name = card.querySelector("#name").textContent.toLowerCase();
    if (name.includes(filter)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});
