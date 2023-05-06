
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
        const ppost = document.getElementById("post");
  
        pmsg.innerText = data[0].Message;
  
        // Create a new HTML element for each post office and append it to the parent element
        data[0].PostOffice.forEach(post => {
          const card = document.createElement("div");
          card.classList.add("card");
  
          const cardBody = document.createElement("div");
          cardBody.classList.add("card-body");
  
          const cardTitle = document.createElement("h5");
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
        });
      })
      .catch(error => console.log(error));
  }
  


