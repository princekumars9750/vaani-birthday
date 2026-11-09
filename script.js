const welcomeScreen = document.getElementById("welcome");
const darkRoomScreen = document.getElementById("dark-room");
const cakeRoomScreen = document.getElementById("cake-room");
const wishScreen = document.getElementById("wish-screen");
const finalScreen = document.getElementById("final-screen");
const envelopeButton = document.getElementById("envelope-button");
const birthdayLetter = document.getElementById("birthday-letter");
const closeLetterButton = document.getElementById("close-letter");
const openButton = document.getElementById("open-button");
const turnOnLightsButton = document.getElementById("turn-on-lights");
const lightButtonLabel = document.getElementById("light-button-label");
const lightsNote = document.getElementById("lights-note");
const cutCakeButton = document.getElementById("cut-cake");
const cakeMessage = document.getElementById("cake-message");
const revealWishButton = document.getElementById("reveal-wish");
const wishCard = document.getElementById("wish-card");
const continueBirthdayButton = document.getElementById("continue-to-birthday");
const celebrateAgainButton = document.getElementById("celebrate-again");
const countdownLabel = document.getElementById("countdown-label");
const countdownDays = document.getElementById("countdown-days");
const countdownHours = document.getElementById("countdown-hours");
const countdownMinutes = document.getElementById("countdown-minutes");
const countdownSeconds = document.getElementById("countdown-seconds");

function updateBirthdayCountdown() {
  const now = new Date();
  const isBirthday = now.getMonth() === 10 && now.getDate() === 10;
  let nextBirthday = new Date(now.getFullYear(), 10, 10);

  if (isBirthday) {
    countdownLabel.textContent = "It's your birthday, Vaani!";
  } else {
    if (now > nextBirthday) {
      nextBirthday = new Date(now.getFullYear() + 1, 10, 10);
    }

    countdownLabel.textContent = "The birthday magic begins in";
  }

  const secondsLeft = isBirthday
    ? 0
    : Math.max(0, Math.floor((nextBirthday.getTime() - now.getTime()) / 1000));

  countdownDays.textContent = String(Math.floor(secondsLeft / 86400)).padStart(2, "0");
  countdownHours.textContent = String(Math.floor((secondsLeft % 86400) / 3600)).padStart(2, "0");
  countdownMinutes.textContent = String(Math.floor((secondsLeft % 3600) / 60)).padStart(2, "0");
  countdownSeconds.textContent = String(secondsLeft % 60).padStart(2, "0");
}

function changeScreen(currentScreen, nextScreen) {
  currentScreen.classList.remove("is-active");
  currentScreen.setAttribute("aria-hidden", "true");
  nextScreen.classList.add("is-active");
  nextScreen.setAttribute("aria-hidden", "false");
}

updateBirthdayCountdown();
window.setInterval(updateBirthdayCountdown, 1000);

envelopeButton.addEventListener("click", () => {
  envelopeButton.classList.add("is-open");
  envelopeButton.setAttribute("aria-expanded", "true");
  birthdayLetter.showModal();
});

closeLetterButton.addEventListener("click", () => {
  birthdayLetter.close();
});

birthdayLetter.addEventListener("close", () => {
  envelopeButton.classList.remove("is-open");
  envelopeButton.setAttribute("aria-expanded", "false");
});

birthdayLetter.addEventListener("click", (event) => {
  if (event.target === birthdayLetter) {
    birthdayLetter.close();
  }
});

openButton.addEventListener("click", () => {
  changeScreen(welcomeScreen, darkRoomScreen);
});

turnOnLightsButton.addEventListener("click", () => {
  darkRoomScreen.classList.add("lights-on");
  lightButtonLabel.textContent = "The lights are on!";
  lightsNote.textContent = "There you are. The birthday room is waking up…";
  turnOnLightsButton.disabled = true;
  window.setTimeout(() => {
    changeScreen(darkRoomScreen, cakeRoomScreen);
  }, 1400);
});

function celebrateCake() {
  if (cakeRoomScreen.classList.contains("cake-cut")) return;

  cakeRoomScreen.classList.add("cake-cut");
  cakeMessage.textContent = "A wish, a little sweetness, and so much joy for you.";
  cutCakeButton.innerHTML = 'Continue to your wish <span aria-hidden="true">♡</span>';

  launchConfetti();
}

function launchConfetti(pieceCount = 64) {
  const confettiColors = ["#e991a8", "#f4c66b", "#d9c9ed", "#f7aec0", "#fff4df"];

  for (let index = 0; index < pieceCount; index += 1) {
    const piece = document.createElement("span");
    piece.setAttribute("aria-hidden", "true");
    piece.style.position = "fixed";
    piece.style.zIndex = "10";
    piece.style.top = "-1rem";
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.width = `${Math.random() * 7 + 5}px`;
    piece.style.height = `${Math.random() * 10 + 7}px`;
    piece.style.borderRadius = Math.random() > 0.5 ? "50%" : "2px";
    piece.style.backgroundColor = confettiColors[Math.floor(Math.random() * confettiColors.length)];
    piece.style.pointerEvents = "none";
    document.body.appendChild(piece);

    const fall = piece.animate(
      [
        { transform: "translateY(0) rotate(0deg)", opacity: 1 },
        {
          transform: `translate(${Math.random() * 180 - 90}px, 105svh) rotate(${Math.random() * 600}deg)`,
          opacity: 0.15
        }
      ],
      { duration: Math.random() * 1700 + 1900, easing: "ease-out" }
    );

    fall.onfinish = () => piece.remove();
  }
}

cutCakeButton.addEventListener("click", () => {
  if (!cakeRoomScreen.classList.contains("cake-cut")) {
    celebrateCake();
    return;
  }

  changeScreen(cakeRoomScreen, wishScreen);
});

revealWishButton.addEventListener("click", () => {
  wishCard.hidden = false;
  revealWishButton.textContent = "Your wish is revealed ♥";
  revealWishButton.disabled = true;
  continueBirthdayButton.hidden = false;
});

continueBirthdayButton.addEventListener("click", () => {
  changeScreen(wishScreen, finalScreen);
  launchConfetti(100);
});

celebrateAgainButton.addEventListener("click", () => {
  launchConfetti(100);
});