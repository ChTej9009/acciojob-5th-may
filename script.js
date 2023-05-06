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
  const info =document.getElementById("info");
  info.style.display = "block";
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
        const Udate = document.getElementById("date");
        city.innerText = data.city;
        region.innerText = data.region;
        country.innerText = data.country;
        location.innerText = data.loc;
        org.innerText = data.org;
        postal.innerText = data.postal;
        localStorage.setItem("postalCode",`${data.postal}`);
        getPincode();


        timezone.innerText = data.timezone;


        let options = {
          timeZone: `${data.timezone}`,
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          timeZoneName: "short"
        };
        
        let current_time = new Date().toLocaleString([], options);
        console.log(current_time);


        Udate.innerText = current_time; 
        
        
        const [lat, long] = data.loc.split(",");
        localStorage.setItem("latitude", lat);
        localStorage.setItem("longitude", long);
        const ulat = document.getElementById("latitude");
        const ulong = document.getElementById("longitude");
        ulat.innerText = lat;
        ulong.innerText = long;
        const map = document.getElementById("map");
        const mapUrl = `https://maps.google.com/maps?q=${lat},${long}&key=AIzaSyDPK7mEk3j6E2ESdkA0oehDTePq2Ufhlhc&z=15&output=embed`;
        map.setAttribute("src", mapUrl);
      
        
      })
      .catch(error => console.error(error));
  } else {
    console.error("IP address not found in localStorage.");
  }
});

function getPincode() {
  let postalCodeadd = localStorage.getItem("postalCode");
  console.log(postalCodeadd);
  let postalUrl = `https://api.postalpincode.in/pincode/${postalCodeadd} `;
  console.log(postalUrl);
  fetch(postalUrl)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      const pmsg = document.getElementById("msg");
      // const ppost = document.getElementById("post");
      const searchInput = document.getElementById("search-input");

      pmsg.innerText = data[0].Message;

      // Render the initial list of post offices
      renderPostOffices(data[0].PostOffice);

      // Listen for changes in the search input and filter the post offices accordingly
      searchInput.addEventListener("input", () => {
        const filteredPostOffices = data[0].PostOffice.filter(post =>
          post.Name.toLowerCase().includes(searchInput.value.toLowerCase()) ||
          post.BranchType.toLowerCase().includes(searchInput.value.toLowerCase())
        );
        renderPostOffices(filteredPostOffices);
      });
    })
    .catch(error => console.log(error));
}

function renderPostOffices(postOffices) {
  const ppost = document.getElementById("post");

  // Clear the previous list of post offices
  ppost.innerHTML = "";

  // Render each post office as a card
  postOffices.forEach(post => {
   

  const card = document.createElement("div");
  card.classList.add("card");

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  const cardTitle = document.createElement("h2");
  cardTitle.classList.add("card-title");
  cardTitle.innerText = post.Name;

  const cardText1 = document.createElement("p");
  cardText1.classList.add("card-text");
  cardText1.innerText = `Branch Type: ${post.BranchType}`;

  const cardText2 = document.createElement("p");
  cardText2.classList.add("card-text");
  cardText2.innerText = `Delivery Status: ${post.DeliveryStatus}`;

  const cardText3 = document.createElement("p");
  cardText3.classList.add("card-text");
  cardText3.innerText = `District: ${post.District}`;

  const cardText4 = document.createElement("p");
  cardText4.classList.add("card-text");
  cardText4.innerText = `Division: ${post.Division}`;

  cardBody.appendChild(cardTitle);
  cardBody.appendChild(cardText1);
  cardBody.appendChild(cardText2);
  cardBody.appendChild(cardText3);
  cardBody.appendChild(cardText4);

  card.appendChild(cardBody);

  ppost.appendChild(card);
   
   
    // const card = document.createElement("div");
    // card.classList.add("card");

    // const name = document.createElement("h2");
    // name.innerText = post.Name;

    // const branchType = document.createElement("p");
    // branchType.innerText = `Branch Type: ${post.BranchType}`;

    // const deliveryStatus = document.createElement("p");
    // deliveryStatus.innerText = `Delivery Status: ${post.DeliveryStatus}`;

    // const district = document.createElement("p");
    // district.innerText = `District: ${post.District}`;

    // const division = document.createElement("p");
    // division.innerText = `Division: ${post.Division}`;

    // card.appendChild(name);
    // card.appendChild(branchType);
    // card.appendChild(deliveryStatus);
    // card.appendChild(district);
    // card.appendChild(division);

    // ppost.appendChild(card);
  });
}



