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

// Starting conditions;
let scores, currentScore, activePlayer, playing;

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
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active"); //will add a class if it isn't there, and remove if it is
  player1El.classList.toggle("player--active");
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

btnHold.addEventListener("click", function () {
  if (playing) {
    // 1. Add current score to active player score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
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

btnNew.addEventListener("click", init);

// TODO: add to git repo. Improvements: Add rules button and modal when button clicked, add 2 more mode(50 points, 100points, 150 points) and 1 button to change modes for each mode, add winner text in winning player. Maybe: change CSS.
