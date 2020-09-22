const audio = new Audio("images/star.ogg");
const cards = document.querySelectorAll(".card-inner");

function flipCard() {
  this.classList.add("flipped");
  audio.play();
}

cards.forEach((card) => card.addEventListener("click", flipCard));
