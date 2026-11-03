
const boardName = "Campus Event Board";
const loadingDelay = 800;                
const showBadges = true;                 

let events = [];

console.log(boardName + " script loaded");   

const menuToggle = document.querySelector(".menu-toggle");       
const navLinks = document.querySelector(".nav-links");           
const searchBox = document.querySelector("#search");            
const eventList = document.querySelector("#event-list");         
const registerForm = document.querySelector("#register-form");   
const nameInput = document.querySelector("#reg-name");          
const formMessage = document.querySelector("#form-message");     
const formFields = document.querySelectorAll("#register-form input"); 
const statusText = document.getElementById("status");         


function getLabel(seats) {
  let label;                 

  if (seats === 0) {
    label = "Full";
  } else if (seats < 5) {
    label = "Few left";
  } else {
    label = "Open";
  }

  return label;
}

function formatEvent(ev) {

  const niceDate = new Date(ev.date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  let place = "On campus";
  if (ev.online) {
    place = "Online";
  }

  return niceDate + " | " + ev.seats + " seats left | " + place;
}


function showEvents() {
  const searchText = searchBox.value.trim().toLowerCase();

  const matching = events.filter(ev => ev.title.toLowerCase().includes(searchText));


  eventList.textContent = "";

  let totalSeats = 0;   
  for (const ev of matching) {


    const card = document.createElement("article");
    const title = document.createElement("h3");
    const description = document.createElement("p");
    const info = document.createElement("p");
    const badge = document.createElement("span");
    const button = document.createElement("button");


    title.textContent = ev.title;
    description.textContent = ev.description;
    info.textContent = formatEvent(ev);     
    info.classList.add("event-meta");
    if (ev.online) {
      info.style.fontStyle = "italic";
    }

    
    const label = getLabel(ev.seats);
    badge.textContent = label;
    badge.classList.add("badge");

    if (label === "Full") {
      badge.classList.add("full");
      card.classList.add("full");            
      button.textContent = "Full";          
      button.disabled = true;                
    } else {
      if (label === "Few left") {
        badge.classList.add("few");
      } else {
        badge.classList.add("open");
      }
      button.textContent = "BOOK";
    }

   
    button.setAttribute("data-id", ev.id);
    button.setAttribute("aria-label", "BOOK for " + ev.title);
    button.classList.add("rsvp-btn");

    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(info);
    if (showBadges) {
      card.appendChild(badge);
    }
    card.appendChild(button);

    
    eventList.appendChild(card);

    totalSeats += ev.seats;
  }


  if (matching.length === 0) {
    statusText.textContent = "No events match \"" + searchBox.value + "\".";
  } else {
    statusText.textContent = "Showing " + matching.length + " of " + events.length +
      " events | " + totalSeats + " seats left";
  }
}


menuToggle.addEventListener("click", function () {

  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", isOpen);
  console.log("Menu open?", isOpen);
});


eventList.addEventListener("click", function (event) {
  const clicked = event.target;               
  console.log("You clicked:", clicked);

  if (!clicked.classList.contains("BOOK-btn")) {
    return;
  }


  const id = Number(clicked.getAttribute("data-id"));

  const ev = events.find(item => item.id === id);

  if (ev && ev.seats > 0) {
    ev.seats = ev.seats - 1;                  // one seat is taken
    console.log("BOOK done for " + ev.title + ". Seats left: " + ev.seats);
    showEvents();                             // draw the cards again with the new number
  }
});


searchBox.addEventListener("input", function () {
  showEvents();
});

searchBox.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    searchBox.value = "";
    showEvents();
  }
});


function wait(ms) {
  return new Promise(function (resolve) {
    setTimeout(resolve, ms);
  });
}


async function loadEvents() {

  statusText.textContent = "Loading events...";

  try {
    await wait(loadingDelay);
    const response = await fetch("events.json");

    if (!response.ok) {
      throw new Error("Server answered with status " + response.status);
    }

    events = await response.json();

    console.log("Events loaded:", events);
    console.log("Titles:", events.map(ev => ev.title));   


    showEvents();

  } catch (error) {

    console.error("Could not load events:", error);
    eventList.textContent = "";
    statusText.textContent = "Sorry, we could not load the events right now. Please try again later.";
  }
}


function checkName() {
  const value = nameInput.value.trim();

  if (value.length < 2) {
    nameInput.setCustomValidity("Name must be at least 2 characters long.");
  } else {
    nameInput.setCustomValidity("");   
  }
}

function showMessage(text, isError) {
  formMessage.textContent = text;
  formMessage.classList.toggle("error", isError);
  formMessage.classList.toggle("success", !isError);
}


nameInput.addEventListener("input", checkName);


formFields.forEach(field => {
  field.addEventListener("input", function () {
    formMessage.textContent = "";
  });
});

registerForm.addEventListener("submit", function (event) {
  event.preventDefault();         

  checkName();


  if (!registerForm.checkValidity()) {
   
    const badField = registerForm.querySelector("input:invalid");
    const fieldName = badField.labels[0].textContent.replace(":", "");

    showMessage(fieldName + ": " + badField.validationMessage, true);
    badField.focus();
    return;
  }

  showMessage("Thank you, " + nameInput.value.trim() + "! You are registered.", false);
  registerForm.reset();
});

loadEvents();
   

fetch('events.json')              // file ka naam/path
  .then(res => res.json())        // text ko object banao
  .then(events => {
    console.log(events);          // yahan data use karo
  });

  fetch('events.xml')
  .then(res => res.text())        // XML ko pehle text me lo
  .then(xmlText => {
    const xmlDoc = new DOMParser().parseFromString(xmlText, 'application/xml');
    console.log(xmlDoc.getElementsByTagName('title')[0].textContent);
  });