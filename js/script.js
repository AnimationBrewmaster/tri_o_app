/* Author: 
	Glen S
*/
var nPlayers = 0; // number of players
var playerName = [];
var playerScore = [];
var roundOver = false;
var gameOver = false;
var won = "";

function initGame () {
	console.log("initializing game");
	resetVariables();
	getPlayerNumber();
	inputPlayerNames(nPlayers);
	startScoring();
}

// *** new game ***
function newGame () {
	var anotherGame = confirm("New Game?");
	if (anotherGame) {
		initGame();
	}
	else {
		// exit
	}
}

function resetVariables () {
	nPlayers = 0;
	playerName = [];
	playerScore = [];
	roundOver = false;
	gameOver = false;
	won = "";
}

function getPlayerNumber () {
	console.log("getting number of players");
	var numberOfPlayers = prompt("Enter Number of Players (1-6):", "0");
	if (isNaN(parseInt(numberOfPlayers))) {
		getPlayerNumber();
	}
	else if (numberOfPlayers < 2 || numberOfPlayers > 6) {
		getPlayerNumber();
	}
	else {
		nPlayers = numberOfPlayers;
		//return numberOfPlayers;
	}
}


function inputPlayerNames(val) {
	console.log("requesting payers names");
	for (i = 0; i < val; i++) {
		var name = prompt("Enter Name of Player # " + (i + 1), "Name");
		playerName[i] = name;
		playerScore[i] = 0;
	}
	console.log(playerName);
	console.log(playerScore);
	console.log(playerName.length);
	console.log(playerScore.length);
}


// *** new round ***
function startScoring () {
	// get starting player score
	var currentPlayer  = getStartingPlayer();
	scoringGame(currentPlayer);
}

function getStartingPlayer() {
	console.log("getting starting player");
	var starter = prompt("Enter Starting Player Number");
	if (isNaN(parseInt(starter))) {
		starter = prompt("Enter Starting Player Number");
	}
	else if (starter < 1 || starter > playerName.length) {
		starter = prompt("Enter Starting Player Number (between 1 and " + playerName.length + "):");
	}
	else {
		starter--;
		return starter;
	}
}

// *** scoring loop ***
function scoringGame (player) {
	var currentPlayer = player;
	getScore(currentPlayer);
	winRound(currentPlayer);
	if (roundOver) {
		checkWinner();
		if (gameOver) {
			alert(won + " won!");
			newGame();
		}
		else {
			alert("New Round");
			startScoring();
		}
	}
	else {
		currentPlayer++;
		if (currentPlayer == playerName.length) {
			currentPlayer = 0;
		}
		scoringGame(currentPlayer);
	}
}

function getScore(player){
	var score = prompt("Enter Score for " + playerName[player]);
	if (isNaN(parseInt(score))) {
		score = prompt("Enter Score for " + playerName[player]);
	}
	else {
		updateScore(player, score);
	} 
}


function updateScore(player, score) {
	console.log("updating score for player " + playerName[player]);
	playerScore[player] += score;
}

function winRound (player) {
	var win = prompt("Did " + playerName[player] + " win? (Y/N)");
	if (win == "Y" || win == "y" || win == "yes" || win == "Yes") {
		// send to win function
		roundScore(player);
		roundOver = true;
	}
	else if (win == "N" || win == "n" || win == "no" || win == "No") {
		// continue to player update
		roundOver = false;
	}
	else {
		win = prompt("Did " + playerName[currentPlayer] + " win? (Y/N)");
	} 
}


// *** end of round scoring and checks ***
function roundScore (player) {
	console.log("calculating round scores");
	// did player finish
	// add 25 if finished
	// add scores of opposing players
	// if no finish negate score for each player
	checkWinner();
}


function checkWinner() {
	var winner = "";
	var topScore = 399;
	for (i = 0; i < playerName.length; i++) {
		if (playerScore[i] > topScore) {
			topScore = playerScore[i];
			winner = playerName[i];
			console.log("we have a winner");
			console.log(playerName[i] + " with a score of " + playerScore[i]); 
		}
		else {
			console.log(playerName[i] + " did not win");
		}
		// check score
	}
	if (winner == "") {
		console.log("No winner");
		gameOver = false;
	}
	else {
		console.log(winner + " won!");
		gameOver = true;
		won = winner;
	}
}

















