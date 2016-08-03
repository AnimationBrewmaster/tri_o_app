/* Author: 
	Glen S
*/
var nPlayers = 0; // number of players
var playerNames = [];

function initGame () {
	console.log("initializing game");
	var players = getPlayerNumber();
	numberOfPlayers(players);
	inputPlayerNames(nPlayers);
	
}

function getPlayerNumber () {
	console.log("getting number of players");
	var numberOfPlayers = prompt("Enter Number of Players (1-6):", "0");
	if (numberOfPlayers < 2 || numberOfPlayers > 6) {
		getPlayerNumber();
	}
	else {
		return numberOfPlayers;
	}
}

function numberOfPlayers(val) {	
	console.log("parsing player number");
	nPlayers = parseInt(val);
}

function inputPlayerNames(val) {
	console.log("requesting payers names");
	for (i = 0; i < val; i++) {
		var playerName = prompt("Enter Name of Player # " + (i + 1), "Name");
		playerNames[i] = playerName;
	}
	console.log(playerNames);
}




















