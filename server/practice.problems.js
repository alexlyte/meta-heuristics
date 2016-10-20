var run_search = require('./general/run.search.js').run_search;

// Search 
var tabu = require('./search/tabu.search.js');
var simulatedAnnealing = require('./search/simulatedAnnealing.search.js');

// Objective 
var minimizeFunction = require('./objective/minimizeFunction.js').evalSolution;
var machineShop = require('./objective/machineShop.js').getWeightedTardiness;
var assignmentShop = require('./objective/assignmentShop.js').getTotalSetupTime;

// Neighborhood
var neighborhood = require('./neighborhood/create.neighborhood.js');

// Ranking
var ranking = require('./ranking/create.ranking.js');

// Evaluating
var evaluate = require('./evaluate/create.evaluation.js');


// HW1
// var hw1 = run_search({
// 	general : {
// 		number_of_iterations : 20,
// 	},
// 	objective_function : {
// 		run : machineShop, 
// 		params : {
// 			inital_value : "2143",
// 		}
// 	},
// 	neighborhood : {
// 		run : neighborhood.permutation.exchange,
// 		params : {
// 			size_of_neighborhood : 4
// 		}
// 	},
// 	search_type : {
// 		run : tabu,
// 		params : {
// 			tabu_length : 3,
// 		}
// 	},
// 	ranking : {
// 		run : ranking.maxObjectiveValue
// 	},
// 	evaluate : {
// 		run : evaluate.greaterThan
// 	}
// });

// console.log(hw1)

// HW2
// var hw2 = run_search({
// 	general : {
// 		number_of_iterations : 100,
// 	},
// 	objective_function : {
// 		run : minimizeFunction, 
// 		params : {
// 			inital_value : "00011",
// 		}
// 	},
// 	neighborhood : {
// 		run : neighborhood.binary.flip,
// 		params : {
// 			size_of_neighborhood : 4
// 		}
// 	},
// 	search_type : {
// 		run : tabu,
// 		params : {
// 			tabu_length : 1,
// 		}
// 	},
// 	ranking : {
// 		run : ranking.minObjectiveValue
// 	},
// 	evaluate : {
// 		run : evaluate.lessThan
// 	}
// });

// console.log(hw2)



// // HW3
// var hw3 = run_search({
// 	general : {
// 		number_of_iterations : 100,
// 	},
// 	objective_function : {
// 		run : minimizeFunction, 
// 		params : {
// 			inital_value : "00011",
// 		}
// 	},
// 	neighborhood : {
// 		run : neighborhood.binary.flip,
// 		params : {
// 			size_of_neighborhood : 1
// 		}
// 	},
// 	search_type : {
// 		run : simulatedAnnealing,
// 		params : {
// 			 T : 500,
// 			 t_min : 100,
// 			 t_max : 500,
// 			 sigma : 0.9,
// 			 beta : 0.5,
// 			 alpha : 0.5,
// 			 cooling_schedule : "linear",
// 			 iteration : 0
// 		}
// 	},
// 	ranking : {
// 		run : ranking.minObjectiveValue
// 	},
// 	evaluate : {
// 		run : simulatedAnnealing.run
// 	}
// });

// console.log(hw3)



// // HW4
var hw4 = run_search({
	general : {
		number_of_iterations : 20,
	},
	objective_function : {
		run : assignmentShop, 
		params : {
			inital_value : "4213",
		}
	},
	neighborhood : {
		run : neighborhood.permutation.exchange,
		params : {
			size_of_neighborhood : 4
		}
	},
	search_type : {
		run : tabu,
		params : {
			tabu_length : 3,
		}
	},
	ranking : {
		run : ranking.maxObjectiveValue
	},
	evaluate : {
		run : evaluate.greaterThan
	}
});


console.log(hw4)



