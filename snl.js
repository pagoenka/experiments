var players = ['pratik', 'computer'];
var position = [0,0];
var cols = 5, rows =6;
var max = cols * rows;


function *move() {
	var win = false;
	while(!win) {
		var currentPlayer = yield;
		var diceValue = rollDice();
		console.log(players[currentPlayer], 'is at', position[currentPlayer], '& dice value is', diceValue);
		var nextPosition = position[currentPlayer] + diceValue;
		if(nextPosition > max) {
			//TODO
		}
		else if(nextPosition == max) {
			console.log(players[currentPlayer], 'won');
			win = true;
		} else {
			position[currentPlayer] += diceValue;	
		}
		yield win;
	}
}

function rollDice() {
	return Math.ceil(Math.random() * 6);
}

function *passDice(player) {
	var currentPlayer = -1;
	var win = false;
	while(!win){
		if(currentPlayer === players.length - 1){
			currentPlayer = 0; 
		}
		else {
			currentPlayer += 1;
		}
		win = player.next(currentPlayer).value;	
		player.next()
		yield win
	}
	//Just to finish generator
	player.next();
}

function startGame() {
	var playerMove = move(),
		win = false;
	playerMove.next();
	dice = passDice(playerMove);
	while(!win) {
		win = dice.next().value;
	}
	//Just to finish the generator
	dice.next();
}

startGame();