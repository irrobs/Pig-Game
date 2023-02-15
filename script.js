"use strict";
// my first attempt

/*

//selected elements
const btnRollDice = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');
const player1 = document.querySelector('.player--0').classList;
const player2 = document.querySelector('.player--1').classList;
const diceImg = document.querySelector('.dice');

//local variables
let currentScore = 0;
let totalScorePlayer1 = 0;
let totalScorePlayer2 = 0;

//functions
const activePlayerSwitch = function (diceRoll) {
  //player switch
  if (player1.contains('player--active')) {
    if (diceRoll !== 1) {
      totalScorePlayer1 += currentScore;
      document.querySelector('#score--0').textContent = totalScorePlayer1;
    }

    if (totalScorePlayer1 < 100) {
      player1.remove('player--active');
      player2.add('player--active');
      currentScore = 0;
      document.querySelector('#current--0').textContent = currentScore;
    } else {
      disableGame();
      player1.add('player--winner');
      document.querySelector('#current--0').textContent = currentScore;
    }
  } else {
    if (diceRoll !== 1) {
      totalScorePlayer2 += currentScore;
      document.querySelector('#score--1').textContent = totalScorePlayer2;
    }

    if (totalScorePlayer2 < 100) {
      player2.remove('player--active');
      player1.add('player--active');
      currentScore = 0;
      document.querySelector('#current--1').textContent = currentScore;
    } else {
      disableGame();
      player2.add('player--winner');
      document.querySelector('#current--1').textContent = currentScore;
    }
  }
};

const resetGame = function () {
  //current scores  reset
  currentScore = 0;

  document.querySelector('#current--0').textContent = currentScore;
  document.querySelector('#current--1').textContent = currentScore;

  //total scores reset
  totalScorePlayer1 = currentScore;
  totalScorePlayer2 = currentScore;

  document.querySelector('#score--0').textContent = totalScorePlayer1;
  document.querySelector('#score--1').textContent = totalScorePlayer2;

  //hide dice img
  if (!diceImg.classList.contains('hidden')) {
    diceImg.classList.add('hidden');
  }

  //set player 1 as active
  if (player2.contains('player--active')) {
    player2.remove('player--active');
    player1.add('player--active');
  }

  //habilitate buttons again
  btnHold.disabled = false;
  btnRollDice.disabled = false;

  //reset styles
  if (player1.contains('player--winner')) {
    player1.remove('player--winner');
  } else if (player2.contains('player--winner')) {
    player2.remove('player--winner');
  }
};

const disableGame = function () {
  btnHold.disabled = true;
  btnRollDice.disabled = true;
  diceImg.classList.add('hidden');
};

const rollTheDice = function () {
  const diceRoll = Math.trunc(Math.random() * 6) + 1;
  document.querySelector('.dice').src = `dice-${diceRoll}.png`;

  if (diceImg.classList.contains('hidden')) {
    diceImg.classList.remove('hidden');
  }

  //add roll to active player current score
  if (diceRoll !== 1) {
    if (player1.contains('player--active')) {
      currentScore += diceRoll;

      document.querySelector('#current--0').textContent = currentScore;
    } else {
      currentScore += diceRoll;

      document.querySelector('#current--1').textContent = currentScore;
    }
  } else {
    activePlayerSwitch(diceRoll);
  }
};

//event listeners
btnRollDice.addEventListener('click', rollTheDice);
btnHold.addEventListener('click', activePlayerSwitch);
btnNew.addEventListener('click', resetGame);
 */

//jonas way to do

// Selecting elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");

const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");

const diceEl = document.querySelector(".dice");

const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const btnRules = document.querySelector(".btn--rules");
const btnClose = document.querySelectorAll(".btn--close");
const btnModes = document.querySelectorAll(".btn--mode");
const btnYes = document.querySelector(".btn--yes");
const btnNo = document.querySelector(".btn--no");
const mode1 = document.querySelector(".mode1");
const mode2 = document.querySelector(".mode2");
const mode3 = document.querySelector(".mode3");

const overlay = document.querySelector(".overlay");
const modalRules = document.querySelector(".modal--rules");
const modalModes = document.querySelector(".modal--modes");
const modalVerification = document.querySelector(".modal--verification");

const activeMode = document.querySelector(".active--mode");

// Starting conditions;
let scores, currentScore, activePlayer, playing, modeScore;
modeScore = 100;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");

  if (modeScore === 100) {
    mode2.style.backgroundColor = "white";
    mode1.removeAttribute("style");
    mode3.removeAttribute("style");
  }
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active"); //will add a class if it isn't there, and remove if it is
  player1El.classList.toggle("player--active");
};

const openModesModal = function (e) {
  if (playing) {
    overlay.classList.remove("hidden");
    modalModes.classList.remove("hidden");
    let clicked = Array.from(e.currentTarget.classList);

    if (clicked.includes("mode1")) {
      modalVerification.textContent = `Would you like to switch to 50 points mode?`;
    } else if (clicked.includes("mode2")) {
      modalVerification.textContent = `Would you like to switch to 100 points mode?`;
    } else if (clicked.includes("mode3")) {
      modalVerification.textContent = `Would you like to switch to 150 points mode?`;
    }

    const switchModes = function () {
      if (clicked.includes("mode1")) {
        modeScore = 50;
        mode1.style.backgroundColor = "white";
        mode2.removeAttribute("style");
        mode3.removeAttribute("style");
        init();
        closeModal();
      } else if (clicked.includes("mode2")) {
        modeScore = 100;
        mode2.style.backgroundColor = "white";
        mode1.removeAttribute("style");
        mode3.removeAttribute("style");
        init();
        closeModal();
      } else if (clicked.includes("mode3")) {
        modeScore = 150;
        mode3.style.backgroundColor = "white";
        mode1.removeAttribute("style");
        mode2.removeAttribute("style");
        init();
        closeModal();
      }
    };

    btnYes.addEventListener("click", switchModes);
    btnNo.addEventListener("click", closeModal);
  }
};

const closeModal = function () {
  overlay.classList.add("hidden");
  if (!modalRules.classList.contains("hidden")) {
    modalRules.classList.add("hidden");
  } else if (!modalModes.classList.contains("hidden")) {
    modalModes.classList.add("hidden");
  }
};

// Rolling dice functionality
btnRoll.addEventListener("click", function () {
  if (playing) {
    // 1. Generate random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;

    // 3. Check for rolled 1: if true, switch to next player
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

// Holding score
btnHold.addEventListener("click", function () {
  if (playing) {
    // 1. Add current score to active player score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= modeScore) {
      //finish the game
      playing = false;
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--active");
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

// restart game
btnNew.addEventListener("click", init);

// opening/closing rules modal
btnRules.addEventListener("click", function () {
  overlay.classList.remove("hidden");
  modalRules.classList.remove("hidden");
});

overlay.addEventListener("click", closeModal);

for (let i = 0; i < btnClose.length; i++) {
  btnClose[i].addEventListener("click", closeModal);
}

for (let i = 0; i < btnModes.length; i++) {
  btnModes[i].addEventListener("click", openModesModal);
}

// TODO: Improvements: Add restart game function after changing modes, add text to modes modal.

/*
Problem: Change modal modes text based on active mode.
*/
