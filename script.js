fetch("https://api.ipify.org?format=json")
.then(response => response.json())
.then(data => {
  // Setting text of element P with id gfg
  const IP = data.ip;
  document.getElementById("gfg").innerHTML = data.ip;
  localStorage.setItem("IP", IP);
})
.catch(error => console.error(error));


const getBtn = document.getElementById("getD");
getBtn.addEventListener("click", () => {
  const IP = localStorage.getItem("IP");
  if (IP) {
    fetch(`https://ipinfo.io/${IP}/geo?token=db76a2c8a598bd`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const city = document.getElementById("city");
        const region = document.getElementById("reg");
        const country = document.getElementById("country");
        const location = document.getElementById("loc");
        const org = document.getElementById("org");
        const postal = document.getElementById("pin");
        const timezone = document.getElementById("tzone");
        city.innerText = data.city;
        region.innerText = data.region;
        country.innerText = data.country;
        location.innerText = data.loc;
        org.innerText = data.org;
        postal.innerText = data.postal;
        timezone.innerText = data.timezone;
        const [lat, long] = data.loc.split(",");
        localStorage.setItem("latitude", lat);
        localStorage.setItem("longitude", long);
        const ulat = document.getElementById("latitude");
        const ulong = document.getElementById("longitude");
        ulat.innerText = lat;
        ulong.innerText = long;
        const map = document.getElementById("map");
        const mapUrl = `https://maps.google.com/maps?q=${latitude},${longitude}&key=AIzaSyDPK7mEk3j6E2ESdkA0oehDTePq2Ufhlhc&z=15&output=embed`;
        map.setAttribute("src", mapUrl);
      
        
      })
      .catch(error => console.error(error));
  } else {
    console.error("IP address not found in localStorage.");
  }
});

// const mapDiv = document.getElementById("map");

// function displayMap(latitude, longitude) {
//   const mapUrl = `https://maps.google.com/maps?q=${latitude},${longitude}&key=AIzaSyDPK7mEk3j6E2ESdkA0oehDTePq2Ufhlhc&z=15&output=embed`;
//   mapDiv.setAttribute("src", mapUrl);
// }