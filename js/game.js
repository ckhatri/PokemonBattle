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

var currentState;
var cpuPokemon;
var userPokemon;

var cpuTurn = {
	play: function() {

	}
};

var playerTurn = {
	play: function() {

	}
};

var init = function() {
	cpuPokemon = pikachu;
	userPokemon = charmander;
	$("#cpuName").text(cpuPokemon.name);
	$("#cpuLvl").text("lvl " + cpuPokemon.lvl);
	$("#userName").text(userPokemon.name);
	$("#userLvl").text("lvl " + userPokemon.lvl);
	currnetState = playerTurn;
};

init();