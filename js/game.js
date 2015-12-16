
/*
	Pokemon objects hold name, health, level, effect and an array of their moves.
	Moves have a name, a type if it's an attack of defensive, power and accuracy.
*/

//charmander object
var charmander = {
	name: "Charmander",
	health: 100,
	lvl: 12,
	effect: null,
	moves: [{
		name: "Ember",
		type: "Attack",
		power: 20,
		accuracy: .80
	},
	{
		name: "Scratch",
		type: "Attack",
		power: 10,
		accuracy: .90
	},
	{
		name: "Leer",
		type: "Defense",
		power: .20,
		accuracy: 1.0
	},
	{
		name: "Growl",
		type: "Defense",
		power: .65,
		accuracy: .65
	}]
};

//pikachu object
var pikachu = {
	name: "Pikachu",
	health: 100,
	lvl: 10,
	effect: null,
	moves: [{
		name: "Thunder Shock",
		type: "Attack",
		power: 10,
		accuracy: .95
	},
	{
		name: "Thunder Bolt",
		type: "Attack",
		power: 25,
		accuracy: .70
	},
	{
		name: "Tail Whip",
		type: "Defense",
		power: .15,
		accuracy: 1.0
	},
	{
		name: "Growl",
		type: "Defense",
		power: .65,
		accuracy: .65
	}]
};

//who is playing
var currentState;
//cpuPokemon
var cpuPokemon;
//userPokemon
var userPokemon;

var cpuTurn = {
	play: function() {
		//gets random move from array.
		var randomMove = Math.floor(Math.random() * 4);
		console.log(randomMove);
		var currentCpuMove = cpuPokemon.moves[randomMove];

		//updates the text field and calls prepare to attack function to make pokemon jump.
		var setupCpuField = function() {
			$("#chatText").text("What will " + cpuPokemon.name + " do?");
			prepareToAttack();
		};

		//makes cpu jump to indicate that its preparing to attack.
		var prepareToAttack = function() {
			$("#pikachuImage").animate({top: "-=25"}, 200, function() {
				$("#pikachuImage").animate({top: "+=25"}, 200);
			});
		};

		//checks to see if the move will go through or not. If it does, it calculates all the info. If it doesn't it ends turn.
		var getAccuracy = function() {
			var setAccuracy = Math.random();
			//move hit
			if (setAccuracy <= currentCpuMove.accuracy) {
				$("#chatText").text(cpuPokemon.name + " used " + currentCpuMove.name);
			}
			//move missed, update state and wait 1.5 seconds before calling loop again.
			else {
				$("#chatText").text(cpuPokemon.name + " missed!");
				currentState = playerTurn;
				setTimeout(loop, 1500);
			}
		};

		console.log("WE GETTING HERE");
		setupCpuField();
	}
};

var playerTurn = {
	play: function() {

	}
};

//check to see if game is over, else play!
var loop = function() {
	if (cpuPokemon.health <= 0 || userPokemon.health <= 0) {
		$("#gameOver").removeClass("hide");
		console.log("Game Over!");
	}
	else {
		currentState.play();
	}
};

//init function which sets the cpu and userPokemon to objects and dynamically gets their names and levels.
//also sets currentState to playerTurn since player always starts first.
var init = function() {
	cpuPokemon = pikachu;
	userPokemon = charmander;
	$("#cpuName").text(cpuPokemon.name);
	$("#cpuLvl").text("lvl " + cpuPokemon.lvl);
	$("#userName").text(userPokemon.name);
	$("#userLvl").text("lvl " + userPokemon.lvl);
	currentState = cpuTurn;
	loop();
};

init();