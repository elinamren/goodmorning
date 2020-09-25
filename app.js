//Add zero if under 10
function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

//Convert seconds
function convertSeconds(s) {
  const min = Math.floor(s / 60);
  let sec = Math.floor(s % 60);
  return min + ":" + addZero(sec);
}

// Get the day and the time and update every second.
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
  (document.getElementById("day").innerHTML = n), 100;

  const h = addZero(d.getHours());
  (document.getElementById("hour").innerHTML = h), 1000;

  const m = addZero(d.getMinutes());
  (document.getElementById("minute").innerHTML = m), 1000;
}

day();

//Click function

//flip cards and play sound when click

const winnerAudio = new Audio("images/fanfare.wav");
const audio = new Audio("images/star.ogg");
const cards = Array.from(document.querySelectorAll(".card-inner")); //Select all cards and make an array

const cardArray = [];

const cardDress = document.querySelector("#card-dress");
const cardBrush = document.querySelector("#card-brush");

const winnerPage = document.querySelector(".winner-page");
// const timeIcon = document.querySelector(".time-icon");

// Click function and check if cards are flipped.
function clickHandler() {
  // IF DRESS CARD IS CLICKED
  if (this == cardDress) {
    const timeDisplay = document.querySelector("#dress-time");
    let time = 0;
    let interval;

    function dressTimer() {
      interval = setInterval(startTimer, 1000);
      function startTimer() {
        time++;
        timeDisplay.innerHTML = convertSeconds(time);
      }
      cardDress.removeEventListener("click", dressTimer);
      cardDress.addEventListener("click", pauseTimer);
    }

    function pauseTimer() {
      clearInterval(interval);
      timeDisplay.innerHTML = convertSeconds(time);
      setTimeout(() => {
        cardDress.classList.add("flipped");
        //timeIcon.classList.add("time-icon-hidden");
        audio.play();
        cardArray.push(1);
      }, 1500);
    }

    dressTimer();
  }

  //IF BRUSH CARD IS CLICKED
  else if (this == cardBrush) {
    const timeDisplay = document.querySelector("#brush-time");
    let timeLeft = 5;

    function brushTimer() {
      const interval = setInterval(startTimer, 1000);
      function startTimer() {
        timeLeft--;
        timeDisplay.innerHTML = convertSeconds(timeLeft);
        if (timeLeft === 0) {
          clearInterval(interval);
          setTimeout(() => {
            cardBrush.classList.add("flipped");
            //timeIcon.classList.add("time-icon-hidden");
            audio.play();
            cardArray.push(1);
          }, 1000);
        }
      }
    }
    brushTimer();
  } else {
    this.classList.add("flipped");
    audio.play();
    cardArray.push(1);
  }

  // IF ALL CARDES ARE FLIPPED
  if (cardArray.length == 6) {
    setTimeout(() => {
      winnerPage.classList.remove("winner-page-hidden");
      winnerAudio.play();
    }, 2000); //delay 2 sec
  }
  this.removeEventListener("click", clickHandler); //remove the eventlistener so cant click again
}

cards.forEach((card) => card.addEventListener("click", clickHandler));

// LÄGG TILL PLAY AGAIN ADD WINNER PAGE HIDDEN
