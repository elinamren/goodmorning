// --- DAY & TIME ---
const dayDisplay = document.querySelector("#day");
const hourDisplay = document.querySelector("#hour");
const minuteDisplay = document.querySelector("#minute");
const secondDisplay = document.querySelector("#second");

// --- CARDS ---
const cards = Array.from(document.querySelectorAll(".card-inner")); //Select all cards and make an array
const cardDress = document.querySelector("#card-dress");
const cardBrush = document.querySelector("#card-brush");
const cardArray = []; // --- ARRAY FOR CARDS, checking if all are flipped

// --- TIME ICONS ---
const timeIconDress = document.querySelector("#time-icon-dress");
const timeIconBrush = document.querySelector("#time-icon-brush");

// --- AUDIO ---
const winnerAudio = new Audio("images/fanfare.wav");
const audio = new Audio("images/star.ogg");

// --- WINNER DIV ---
const winnerPage = document.querySelector(".winner-page");
//const playAgain = document.querySelector(".play-again");

//Add zero if under 10 (for clock and timers)
function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

//Convert seconds (for timers)
function convertSeconds(s) {
  const min = Math.floor(s / 60);
  let sec = Math.floor(s % 60);
  return min + ":" + addZero(sec); //add the zero when 1-9
}

// Get day and time. update every second.
function myTime() {
  setInterval(() => {
    // update every second
    const date = new Date(); // get date
    const weekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ]; // Array with all the weekdays

    const day = weekdays[date.getDay()]; //get day and show at day display
    dayDisplay.innerHTML = day;

    const hour = addZero(date.getHours()); //get hour and show at hour display
    hourDisplay.innerHTML = hour;

    const minute = addZero(date.getMinutes()); //get minutes and show at minutes display
    minuteDisplay.innerHTML = minute;
  }, 1000);
}

myTime();

// --- CLICK CARDS
function clickHandler() {
  // IF DRESS CARD CLICKED - stopwatch
  if (this == cardDress) {
    //if this that is clicked is the dress card
    const timeDisplay = document.querySelector("#dress-time"); //dress time display.
    let time = 0; //start at 0
    let interval; //the interval. to be abale to clear later

    function dressTimer() {
      interval = setInterval(startTimer, 1000); // update every second
      function startTimer() {
        time++;
        timeDisplay.innerHTML = convertSeconds(time); // add 1 every second and show in time display. convert if it gets over 60 and add 1 minute.
      }
      cardDress.removeEventListener("click", dressTimer); // remove and add new event listener get to stop the watch on click
      cardDress.addEventListener("click", pauseTimer);
    }

    function pauseTimer() {
      clearInterval(interval); // clear interval to make the timer stop
      timeDisplay.innerHTML = convertSeconds(time); //show the stoped time on time display
      setTimeout(() => {
        // add a delay to flip card when time is cleard
        cardDress.classList.add("flipped"); // add class flipped to make the card turn 180deg
        audio.play(); //play audio
        cardArray.push("hey dress card is flipped"); // add to the array. to know when all cards are flipped.
        setTimeout(() => {
          // add delay to hide time icon
          timeIconDress.classList.add("time-icon-hidden"); //hide the time icon after 0.485s
        }, 485);
      }, 1500); // flip card after 1.5s
    }

    dressTimer();
  }

  //IF BRUSH CARD CLICKED - timer
  else if (this == cardBrush) {
    // if this that is clicked is the card brush
    const timeDisplay = document.querySelector("#brush-time"); // time display
    let timeLeft = 120; //start count down from

    function brushTimer() {
      const interval = setInterval(startTimer, 1000); // interval to be able to clear later. set interval - update every second.
      function startTimer() {
        timeLeft--; // minus 1 every second.
        timeDisplay.innerHTML = convertSeconds(timeLeft); //show time at the brush time display
        if (timeLeft === 0) {
          //when the time have been counting down to 0 - stop- clear interval.
          clearInterval(interval);
          setTimeout(() => {
            // add delay for the card to flip
            cardBrush.classList.add("flipped"); // add class flipped to make card turn 180deg.
            audio.play(); //play audio
            cardArray.push("brush card is now flipped"); //add to array
            setTimeout(() => {
              //add delay for time icon to hide
              timeIconBrush.classList.add("time-icon-hidden"); //hide time icon with display none class after 0.48d.
            }, 480);
          }, 1000); //card flippes after 1s
        }
      }
    }
    brushTimer();
  } else {
    this.classList.add("flipped"); //flip the other cards if clicked
    audio.play(); //play audio
    cardArray.push("Hey, this card is flipped"); //add to array
  }

  // IF ALL CARDES ARE FLIPPED
  if (cardArray.length == 6) {
    // if 6 cards ar added to the array
    setTimeout(() => {
      //add delay to see the winner div
      winnerPage.classList.remove("hidden"); //remove opacy 0 class on winner div to make it show
      winnerAudio.play(); //play winner audio
    }, 2000); //delay with 2 sec
  }
  this.removeEventListener("click", clickHandler); //remove the eventlistener so you can't click again
}

cards.forEach((card) => card.addEventListener("click", clickHandler)); //add event listener for all the cards in array made off all card.

//playAgain.addEventListener("click", function () {
//winnerPage.classList.add("hidden");
//});
