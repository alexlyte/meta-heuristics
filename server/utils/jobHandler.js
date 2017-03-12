var promise = require('promise');

var run_search = require('../algorithms/general/run.search.js').run_search;

// Search 
var tabu = require('../algorithms/search/tabu.search.js');
var simulatedAnnealing = require('../algorithms/search/simulatedAnnealing.search.js');

// Objective 
var minimizeFunction = require('../algorithms/objective/minimizeFunction.js').evalSolution;
var machineShop = require('../algorithms/objective/machineShop.js').getWeightedTardiness;
var assignmentShop = require('../algorithms/objective/assignmentShop.js').getTotalSetupTime;

// Neighborhood
var neighborhood = require('../algorithms/neighborhood/create.neighborhood.js');

// Ranking
var ranking = require('../algorithms/ranking/create.ranking.js');

// Evaluating
var evaluate = require('../algorithms/evaluate/create.evaluation.js');

var fx_map = {
	"tabu" : tabu, 
	"simulatedAnnealing" : simulatedAnnealing,

	"minimizeFunction" : minimizeFunction,
	"machineShop" : machineShop,
	"assignmentShop" : assignmentShop, 

	"neighborhood.permutation.exchange" : neighborhood.permutation.exchange,
	"neighborhood.binary.flip" : neighborhood.binary.flip,

	"ranking.maxObjectiveValue" : ranking.maxObjectiveValue,
	"ranking.minObjectiveValue" : ranking.minObjectiveValue,

	"evaluate.greaterThan" : evaluate.greaterThan,
	"evaluate.lessThan" : evaluate.lessThan,
};

function map_configs(config) {
	config.objective_function.run = fx_map[config.objective_function.run];
	config.neighborhood.run = fx_map[config.neighborhood.run];
	config.search_type.run = fx_map[config.search_type.run];
	config.ranking.run = fx_map[config.ranking.run];
	config.evaluate.run = fx_map[config.evaluate.run];
	return config
};

exports.handle = function (ws, job) {
	return new promise(function (resolve, reject) {
		var msg = "Processing Job: " + job.name;
		var conf = map_configs(job.configs);
		run_search(conf)
		.then(function(good) {
			ws.send("good")
			resolve()
		}, function(bad) {
			console.log(bad)
			ws.send("Error")
		}, function (progress) {
		    console.log('progress update')
		});
	})

};

