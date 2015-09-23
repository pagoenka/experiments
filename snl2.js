function Player(name){
	this.position = 0;
	this.name = name;
}

function Board(){
	this.cols = 5;
	this.rows = 6;
	this.getMax = function() {
		return this.cols * this.rows;
	}
	this.snakesNLadder = function() {
		return {
			27:1,
			21:9,
			17:4,
			19:7,
			11:26,
			3:22,
			5:8,
			20:29
		}
	}
	this.players = [];
}

function biteOrRide(board, position) {
	var snakesOrLadder = board.snakesNLadder()[position];
	if(snakesOrLadder) {
		console.log('snakesOrLadder', position , 'to', snakesOrLadder);
		return snakesOrLadder
	}
	return position;
}

function *rollNMove(board) {
	var win = false;
	while(!win) {
		var currentPlayer = yield,
			diceValue = rollDice();
		console.log(board.players[currentPlayer].name, 'is at', board.players[currentPlayer].position, '& dice value is', diceValue);
		var nextPosition = board.players[currentPlayer].position + diceValue;
		if(nextPosition > board.getMax()) {
			console.log('Pass for', board.players[currentPlayer].name);
		}
		else if(nextPosition == board.getMax()) {
			console.log(board.players[currentPlayer].name, 'won');
			win = true;
		} 
		else {
			nextPosition = biteOrRide(board, nextPosition);
			board.players[currentPlayer].position = nextPosition;	
		}
		yield win;
	}
}

function rollDice() {
	return Math.ceil(Math.random() * 6);
}

function *passDice(player, players) {
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

	var board = new Board(),
		player1 = new Player('pratik');
		player2 = new Player('computer');

	board.players.push(player1);
	board.players.push(player2);

	var move = rollNMove(board),
		win = false;

	//Just to initialise
	move.next();
	dice = passDice(move, board.players);

	while(!win) {
		win = dice.next().value;
		wait();
	}
	//Just to finish the generator
	dice.next();
}

function wait() {
	for(var i =0; i < 1000000000; i++) {

	}
}

startGame();