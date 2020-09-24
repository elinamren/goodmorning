// Get the day of today and the time. Add zero if under 10
function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

window.onload = function () {
  let start = setInterval(day);
};

function day() {
  const d = new Date();
  const weekday = new Array(7);
  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";

  const n = weekday[d.getDay()];
  (document.getElementById("day").innerHTML = n), 1000;

  const h = addZero(d.getHours());
  (document.getElementById("hour").innerHTML = h), 1000;

  const m = addZero(d.getMinutes());
  (document.getElementById("minute").innerHTML = m), 1000;
}

day();

//CREATE & DIVS

//ARRAY WIth all the divs
// foreach item clicked add to array

//Click function

//flip cards and play sound when click

const winnerAudio = new Audio();
const audio = new Audio("images/star.ogg");
const cards = Array.from(document.querySelectorAll(".card-inner"));

function clickHandler() {
  this.classList.add("flipped");
  const allFlipped = cards.every((card) => card.classList.contains("flipped"));
  audio.play();
  if (allFlipped) {
    setTimeout(() => {
      window.location.replace("winner.html");
      winnerAudio.play();
    }, 2000);
  }

  this.removeEventListener("click", clickHandler);
}

cards.forEach((card) => card.addEventListener("click", clickHandler));
