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
	getScore(currentPlayer);
	var triple = confirm("Start with Triple?");
	if (triple) {
		playerScore[currentPlayer] += 10;
		console.log("Started with Triple + 10 points");
		var zero = confirm("Triple Zero?");
		if (zero) {
			playerScore[currentPlayer] += 30;
			console.log("Started with Triple Zero + 30 points");
		}
	}
	else {
		console/log("started without Triple");
	}
	currentPlayer++;
	console.log("current Player: " + currentPlayer);
	if (currentPlayer == playerName.length) {
		currentPlayer = 0;
		console.log("resetting current player to zero");
	}
	scoringGame(currentPlayer);
}

function getStartingPlayer() {
	console.log("getting starting player");
	var starter = prompt("Enter Starting Player Number");
	if (isNaN(parseInt(starter))) {
		//starter = prompt("Enter Starting Player Number");
		getStartingPlayer();
	}
	else if (starter < 1 || starter > playerName.length) {
		//starter = prompt("Enter Starting Player Number (between 1 and " + playerName.length + "):");
		getStartingPlayer();
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
	console.log("Round Over: " + roundOver);
	if (roundOver) {
		//checkWinner();
		console.log("Game Over: " + gameOver);
		if (gameOver) {
			displayScore(); // console score summary
			alert(won + " won!");			
			newGame();
		}
		else {
			displayScore(); // console score summary
			alert("New Round");
			startScoring();
		}
	}
	else {
		currentPlayer++;
		if (currentPlayer == playerName.length) {
			currentPlayer = 0;
			console.log("resetting current player to zero");		
		}
		displayScore(); // console score summary
		var noQuit = confirm("Continue Playing?");
		if (noQuit) {
			scoringGame(currentPlayer);
		}
		else {
			console.log("loop ends");
			// loop ends
		}
	}

}


function getScore(player){
	var score = prompt("Enter Score for " + playerName[player]);
	if (isNaN(parseInt(score))) {
		getScore(player);
		//score = prompt("Enter Score for " + playerName[player]);
	}
	else {
		updateScore(player, score);
	} 
}


function updateScore(player, score) {
	console.log("updating score for player " + playerName[player]);
	playerScore[player] += parseInt(score);
}

function winRound (player) {
	var win = confirm("Did " + playerName[player] + " win?");
	if (win) {
		roundScore(player);
		roundOver = true;
	}
	else {
		roundOver = false;
	}
	
	/*
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
		//win = prompt("Did " + playerName[currentPlayer] + " win? (Y/N)");
		winRound(player);
	}
	*/ 
}


function displayScore(){
	var val = playerName.length;
	for (i = 0; i < val; i++) {
		console.log(playerName[i] + " - " + playerScore[i]);
	}
}


// *** end of round scoring and checks ***
function roundScore (player) {
	console.log("calculating round scores");
	// did player finish
	var finish = confirm("Did " + playerName[player] + " finish the round?");
	if (finish) {
		console.log("adding 25 to round winner score");		
		playerScore[player] += 25;		
		console.log("adding other players points to winner's score");
		collectPoints(player);
	}
	else {
		console.log("adding other players points to winner's score");
		collectPoints(player);
		console.log("removing points left in round winners hand");
		playerScore[player] -= collectScore(player);
	}
	checkWinner();
}

function collectPoints(winner) {
	var val = playerName.length;
	for (i = 0; i < val; i++) {
		if (i == winner) {
			console.log("skipping collecting points from winner");
		}
		else {
			playerScore[winner] += collectScore(i);
		}
	}
}

function collectScore(player) {
	var score = prompt("Enter points in hand for " + playerName[player]);
	if (isNaN(parseInt(score))) {
		console.log("not a number");
		collectScore(player);
		//score = prompt("Enter Score for " + playerName[player]);
	}
	else {
		return parseInt(score);
	} 
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

















