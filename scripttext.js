

  //   create a function getUserData which will take the IP as an argument, and use it to get the user's location and time. You can use the following code to make the API request:

  function getUserData(IP) {
    fetch(`https://ipinfo.io/${IP}/geo?token=db76a2c8a598bd`)
      .then(response => response.json())
      .then(data => {
        // call the functions to display the user's location on the map and show the time
       
        displayMap(data.loc);
        showTime(data.timezone);
        getPostalOffices(data.postal);
      })
      .catch(error => console.error(error));
  }
  

//   function displayMap(location) {
//     const [lat, long] = location.split(",");
//     const mapContainer = document.getElementById("map");
//     const options = {
//       center: { lat: parseFloat(lat), lng: parseFloat(long) },
//       zoom: 8,
//     };
//     const map = new google.maps.Map(mapContainer, options);
//     // add a marker at the user's location
//     const marker = new google.maps.Marker({
//       position: { lat: parseFloat(lat), lng: parseFloat(long) },
//       map: map,
//     });
//   }


// MAP
const getIPBtn = document.getElementById("get-ip");
const getLocationBtn = document.getElementById("getD");
const removeLocationBtn = document.getElementById("remove");
const mapDiv = document.getElementById("map");
const getLatitude = document.getElementById("latitude");
const getLongitude = document.getElementById("longitude");
const pincodeInput = document.getElementById("pincode");
// const searchInput = document.getElementById("search");
const postalOfficeList = document.getElementById("postal-office-list");

getIPBtn.addEventListener("click", getIP);
getLocationBtn.addEventListener("click", getLocation);
removeLocationBtn.addEventListener("click", removeLocation);
pincodeInput.addEventListener("change", getPostalOffices);
searchInput.addEventListener("input", filterPostalOffices);

async function getIP() {
  try {
    const response = await fetch("https://api.ipify.org/?format=json");
    const { ip } = await response.json();
    localStorage.setItem("ip", ip);
    const data = await getIPInfo(ip);
    fillData(data);
    getPostalOffices();
  } catch (error) {
    console.log(error);
  }
}

async function getIPInfo(ip) {
  const url = `https://ipinfo.io/${ip}/geo`;
  const response = await fetch(url);
  return response.json();
}

function fillData(data) {
  const cityElement = document.getElementById("city");
  const regionElement = document.getElementById("region");
  const countryElement = document.getElementById("country");
  const timezoneElement = document.getElementById("timezone");
  const postalElement = document.getElementById("postal");

  cityElement.textContent = data.city || "Unknown";
  regionElement.textContent = data.region || "Unknown";
  countryElement.textContent = data.country || "Unknown";
  timezoneElement.textContent = data.timezone || "Unknown";
  postalElement.textContent = data.postal || "Unknown";

  if (data.latitude && data.longitude) {
    displayMap(data.latitude, data.longitude);
  }
}

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
  getLatitude.textContent = `Your Current Latitude : ${position.coords.latitude}`;
  getLongitude.textContent = `Your Current Longitude : ${position.coords.longitude}`;

  displayMap(latitude, longitude);
  getLocationBtn.style.display = "none";
  removeLocationBtn.style.display = "block";
}

function displayMap(latitude, longitude) {
  // const mapUrl = `https://maps.google.com/maps?q=${latitude},${longitude}&key=AIzaSyDPK7mEk3j6E2ESdkA0oehDTePq2Ufhlhc&z=15&output=embed`;
  const mapUrl = `https://maps.google.com/maps?q=${latitude},${longitude}&key=AIzaSyDPK7mEk3j6E2ESdkA0oehDTePq2Ufhlhc&z=15&output=embed`;
  mapDiv.setAttribute("src", mapUrl);
}

function removeLocation() {
  localStorage.removeItem("lat");
  localStorage.removeItem("long");
  getLocationBtn.style.display = "block";
  removeLocationBtn.style.display = "none";
  getLatitude.textContent = ``;
  getLongitude.textContent = ``;
  mapDiv.setAttribute("src", "");
}


function displayMap(latitude, longitude) {
  const mapUrl = `https://maps.google.com/maps?q=${latitude},${longitude}&key=AIzaSyDPK7mEk3j6E2ESdkA0oehDTePq2Ufhlhc&z=15&output=embed`;

  mapDiv.setAttribute("src", mapUrl);
}















  function showTime(timezone) {
    const currentTime = moment().tz(timezone).format("dddd, MMMM Do YYYY, h:mm:ss a");
    const timeElement = document.getElementById("date");
    timeElement.innerHTML = currentTime;
  }

  
  function getPostalOffices(pincode) {
    return fetch(`https://api.postalpincode.in/pincode/${pincode}`)
      .then(response => response.json())
      .then(data => {
        const postOffices = data[0].PostOffice;
        return postOffices;
      })
      .catch(error => console.error(error));
  }












  const searchInput = document.getElementById("search");

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase().trim();
  const filteredOffices = postOffices.filter((office) => {
    return office.Name.toLowerCase().includes(query) ||
      office.BranchType.toLowerCase().includes(query) ||
      office.District.toLowerCase().includes(query);
  });
  showPostOffices(filteredOffices);
});


function showPostOffices(offices) {
    const postOfficeContainer = document.getElementById("post-offices");
    postOfficeContainer.innerHTML = "";
  
    offices.forEach((office) => {
      const officeCard = document.createElement("div");
      officeCard.className = "card";
  
      const nameDiv = document.createElement("div");
      nameDiv.textContent = `Name: ${office.Name}`;
      officeCard.appendChild(nameDiv);
  
      const branchDiv = document.createElement("div");
      branchDiv.textContent = `Branch Type: ${office.BranchType}`;
      officeCard.appendChild(branchDiv);
  
      const statusDiv = document.createElement("div");
      statusDiv.textContent = `Delivery Status: ${office.DeliveryStatus}`;
      officeCard.appendChild(statusDiv);
  
      const districtDiv = document.createElement("div");
      districtDiv.textContent = `District: ${office.District}`;
      officeCard.appendChild(districtDiv);
  
      const divisionDiv = document.createElement("div");
      divisionDiv.textContent = `Division: ${office.Division}`;
      officeCard.appendChild(divisionDiv);
  
      postOfficeContainer.appendChild(officeCard);
    });
  }

  

  
  
  getPostalOffices(pincode)
  .then(postOffices => {
      const filteredPostOffices = postOffices.filter(postOffice => postOffice.Name.toLowerCase().includes(filter.toLowerCase()) || postOffice.BranchType.toLowerCase().includes(filter.toLowerCase()));
      const postOfficeCards = filteredPostOffices.map(postOffice => `
      <div class="card">
        <div>Name: <span>${postOffice.Name}</span></div>
        <div>Branch Type: <span>${postOffice.BranchType}</span></div>
        <div>Delivery Status: <span>${postOffice.DeliveryStatus}</span></div>
        <div>District: <span>${postOffice.District}</span></div>
        <div>Division: <span>${postOffice.Division}</span></div>
        </div>
        `).join('');

        document.getElementById("loc").innerHTML += `
        <h3>Postal Offices:</h3>
        <input type="search" id="postOfficeFilter" placeholder="Filter post offices">
        <div id="postOffices">${postOfficeCards}</div>
        `;
        
        const postOfficeFilter = document.getElementById("postOfficeFilter");
        postOfficeFilter.addEventListener("input", (event) => {
            const filter = event.target.value;
            const filteredPostOffices = postOffices.filter(postOffice => postOffice.Name.toLowerCase().includes(filter.toLowerCase()) || postOffice.BranchType.toLowerCase().includes(filter.toLowerCase()));
            const postOfficeCards = filteredPostOffices.map(postOffice => `
            <div class="card">
            <div>Name: <span>${postOffice.Name}</span></div>
            <div>Branch Type: <span>${postOffice.BranchType}</span></div>
            <div>Delivery Status: <span>${postOffice.DeliveryStatus}</span></div>
            <div>District: <span>${postOffice.District}</span></div>
            <div>Division: <span>${postOffice.Division}</span></div>
            </div>
            `).join('');
            
            document.getElementById("postOffices").innerHTML = postOfficeCards;
        });
    })
    .catch(error => console.error(error));
    
    
    
    
    function getPostalOffices(pincode) {
      const url = `https://api.postalpincode.in/pincode/${pincode}`;
    
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          if (data[0].PostOffice.length > 0) {
            const postOffices = data[0].PostOffice;
            showPostOffices(postOffices);
          }
        })
        .catch((error) => console.error(error));
    }
    

