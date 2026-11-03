// A2: Store values in variables

const eventTitle = "Tech Fest";  // String

let seats = 50;                  // Number

const isOnline = true;           // Boolean

console.log(eventTitle);
console.log(seats);
console.log(isOnline);

// A3: Model events using an array of objects

const events = [

    {
        title: "Tech Fest",
        date: "10 November 2026",
        seats: 0,
        online: false
    },

    {
        title: "Coding Competition",
        date: "15 November 2026",
        seats: 3,
        online: true
    },

    {
        title: "Web Development Workshop",
        date: "20 November 2026",
        seats: 15,
        online: false
    }

];

// Display all events
console.log(events);
console.log(events[0].title);

console.log(events[1].seats);

console.log(events[2].online);

// A4: Decide event status using if-else

function getStatus(seats) {

    if (seats === 0) {

        return "Full";

    }

    else if (seats < 5) {

        return "Few left";

    }

    else {

        return "Open";

    }

}

// Testing the function

console.log(getStatus(0));
console.log(getStatus(3));
console.log(getStatus(15));
console.log(getStatus(events[0].seats));
console.log(getStatus(events[1].seats));
console.log(getStatus(events[2].seats));

// A5: Repeat with a loop (for...of)

for (const event of events) {

    console.log(event.title);

}

// A6: Function with parameter and return

function formatEvent(event) {

    return event.title + " - " +
           event.date + " - " +
           getStatus(event.seats);

}

// Calling the function
console.log(formatEvent(events[0]));
console.log(formatEvent(events[1]));
console.log(formatEvent(events[2]));

// A7: Filter events using an arrow function

const availableEvents = events.filter(event => event.seats > 0);

console.log(availableEvents);

// A8: Understanding variable scope

function showMessage() {
    const message = "Welcome to Campus Event Board";
    console.log(message);
}

showMessage();