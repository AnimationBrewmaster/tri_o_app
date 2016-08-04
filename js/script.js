/* Author: 
	Glen S
*/
var nPlayers = 0; // number of players
var playerNames = [];
var playerScores = [];

function initGame () {
	console.log("initializing game");
	getPlayerNumber();
	inputPlayerNames(nPlayers);
	startScoring();
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
		var playerName = prompt("Enter Name of Player # " + (i + 1), "Name");
		playerNames[i] = playerName;
		playerScores[i] = 0;
	}
	console.log(playerNames);
	console.log(playerScores);
}

function startScoring () {
	// who starts
	// loop scoring
	// input score
	// win the round?
	// move to next player
	// repeat
}


function updateScore() {
	
}



function checkWinner() {
	var topScore = 399;
	for (i = 0; i < playerNames.length; i++) {
		if (playerScores[i] > topScore) {
			playerScores[i] = topScore;
			winner = playerNames[i]; 
		}
		else {
			console.log(playerNames[i] + " did not win");
		}
		// check score
	}
}

















