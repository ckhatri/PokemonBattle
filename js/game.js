
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
		power: -.20,
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
		power: -.15,
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

//does the cpu turn stuff, picks move, updates chat box, hits or misses and updates accordingly.
var cpuTurn = {
	play: function() {
		//gets random move from array.
		var randomMove;
		//if the cpu already used a defensive move, hence set an effect don't randomize the two defensive moves.
		if (!userPokemon.effect) {
			randomMove = Math.floor(Math.random() * 4);
		}
		else {
			randomMove = Math.floor(Math.random() * 2);
		}
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
			getAccuracy();
		};

		//checks to see if the move will go through or not. If it does, it calculates all the info. If it doesn't it ends turn.
		var getAccuracy = function() {
			var setAccuracy = Math.random();
			//move hit
			if (setAccuracy <= currentCpuMove.accuracy) {
				$("#chatText").text(cpuPokemon.name + " used " + currentCpuMove.name);
				getMoveType();
			}
			//move missed, update state and wait 1.5 seconds before calling loop again.
			else {
				$("#chatText").text(cpuPokemon.name + " missed with " + currentCpuMove.name);
				currentState = playerTurn;
				setTimeout(loop, 1000);
			}
		};

		//gets the move type and calls the correct function for it.
		var getMoveType = function() {
			showMoveAnimation();
			setTimeout(resetMoveAnimation, 1000);
			if (currentCpuMove.type == "Attack") {
				setTimeout(attackingMove, 1000);
			}
			else {
				setTimeout(defensiveMove, 1000);
			}
		};

		//shows the attack animation.
		var showMoveAnimation = function() {
			$("#attackImage").addClass("cpuAttackImage");
			$("#attackImage").removeClass("hide");
			$("#attackImage").fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100);
		};

		var resetMoveAnimation = function() {
			$("#attackImage").addClass("hide");
			$("#attackImage").removeClass("cpuAttackImage");
		};
		//attacks and deals damage based on power and effect.
		var attackingMove = function() {
			//if the pokemon doesn't have an effect, just do normal calculation.
			if (!cpuPokemon.effect) {
				userPokemon.health -= currentCpuMove.power;
			}
			//has some effect
			else {
				userPokemon.health -= currentCpuMove.power - (currentCpuMove.power * cpuPokemon.effect);
				cpuPokemon.effect = null;
			}
			$("#userHealthBar").css("width", userPokemon.health + "%");
			currentState = playerTurn;
			setTimeout(loop, 1000);
		};

		//if its a defensive move it sets the effect of the opponent.
		var defensiveMove = function() {
			userPokemon.effect = currentCpuMove.power;
			currentState = playerTurn;
			setTimeout(loop, 1000);
		};

		setupCpuField();
	}
};

var playerTurn = {
	play: function() {
		var currentUserMove;
		var setUpUserField = function() {
			$("#users-buttons").removeClass("hide");
			$("#chatText").text("What will " + userPokemon.name + " do?");
			var moveButtons = ["#move1-Text", "#move2-Text", "#move3-Text", "#move4-Text"];
			for(var i = moveButtons.length - 1; i >= 0; i--) {
				$(moveButtons[i]).text(userPokemon.moves[i].name);
			}

		};

		//makes cpu jump to indicate that its preparing to attack.
		var prepareToAttack = function() {
			$("#users-buttons").addClass("hide");
			$("#charmanderImage").animate({top: "-=25"}, 200, function() {
				$("#charmanderImage").animate({top: "+=25"}, 200);
			});
			getAccuracy();
		};

		var getAccuracy = function() {
			var setAccuracy = Math.random();
			//move hit
			if (setAccuracy <= currentUserMove.accuracy) {
				$("#chatText").text(userPokemon.name + " used " + currentUserMove.name);
				getMoveType();
			}
			//move missed, update state and wait 1.5 seconds before calling loop again.
			else {
				$("#chatText").text(userPokemon.name + " missed with " + currentUserMove.name);
				currentState = cpuTurn;
				setTimeout(loop, 1000);
			}
		};

		//gets the move type and calls the correct function for it.
		var getMoveType = function() {
			showMoveAnimation();
			setTimeout(resetMoveAnimation, 1000);
			if (currentUserMove.type == "Attack") {
				setTimeout(attackingMove, 1000);
			}
			else {
				setTimeout(defensiveMove, 1000);
			}
		};
 		
 		//show the moving animation
		var showMoveAnimation = function() {
			$("#attackImage").addClass("userAttackImage");
			$("#attackImage").removeClass("hide");
			$("#attackImage").fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100);
		};

		//resetes the moving animation
		var resetMoveAnimation = function() {
			$("#attackImage").addClass("hide");
			$("#attackImage").removeClass("userAttackImage");
		};

		//attacks and deals damage based on power and effect.
		var attackingMove = function() {
			//if the pokemon doesn't have an effect, just do normal calculation.
			if (!userPokemon.effect) {
				cpuPokemon.health -= currentUserMove.power;
			}
			//has some effect
			else {
				cpuPokemon.health -= currentUserMove.power - (currentUserMove.power * userPokemon.effect);
				currentUserMove.effect = null;
			}
			$("#cpuHealthBar").css("width", cpuPokemon.health + "%");
			currentState = cpuTurn;
			setTimeout(loop, 1000);
		};

		//if its a defensive move it sets the effect of the opponent.
		var defensiveMove = function() {
			cpuPokemon.effect = currentUserMove.power;
			currentState = cpuTurn;
			setTimeout(loop, 1000);
		};

		setUpUserField();

		$("#move1-Button, #move2-Button, #move3-Button, #move4-Button").unbind().click(function() {
			var moveNum = $(this).attr("value");
			currentUserMove = userPokemon.moves[moveNum];
			prepareToAttack();
		});
	}
};

//check to see if game is over, else play!
var loop = function() {
	if (cpuPokemon.health <= 0 || userPokemon.health <= 0) {
		$("#gameOver").removeClass("hide");
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
	currentState = playerTurn;
	loop();
};

init();